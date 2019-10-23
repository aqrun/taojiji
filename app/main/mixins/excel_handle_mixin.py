
import openpyxl
from sqlalchemy import func
from ...models.taobao_order import TaobaoOrder, TaobaoProduct
from ...models import db_session


class ExcelHandleMixin:

    repeated_data = []

    def handle_excel(self, source_file):
        xl = openpyxl.load_workbook(source_file)
        table = xl.active

        for row in table:
            rindex = row[0].row
            # 跳过第1 2行
            if rindex <= 2:
                continue

            # order_id = row[1].value
            receiver_name = row[16].value
            receiver_cellphone = row[18].value
            # print(order_id)
            # print('Reading #%s' % i)


            order: TaobaoOrder = None
            order, order_count = self.fetch_data_from_taobao_orders(receiver_name=receiver_name,
                                                                    receiver_cellphone=receiver_cellphone)
            # print(order, order_count)
            if order_count > 1:
                self.repeated_data.append({
                    'receiver_name': receiver_name,
                    'receiver_cellphone': receiver_cellphone
                })
                order = None

            # print(data)
            if order:
                # 物流公司
                table['Y%s' % rindex].value = order.logistic_company_name
                # 物流单号
                table['Z%s' % rindex].value = order.logistic_bill_number
                # print('%s  %s' % (table['Q%s' % rindex].value, table['Z%s' % rindex].value))
                print('Handled: ', order.receiver_name)

        xl.save(source_file)

        return self.repeated_data
        # print('重复数据：', repeated_data)
        # print('Handle complete')

    def fetch_data_from_taobao_orders(self, order_id='', receiver_name='', receiver_cellphone=''):
        if order_id:
            order = db_session.query(TaobaoOrder).filter(TaobaoOrder.order_id == order_id).one()
            return (order, 1)
        else:
            # print('234',receiver_name, receiver_cellphone)
            orderdata = db_session.query(
                TaobaoOrder,
                func.count('*').label('order_count')
            ).filter(
                TaobaoOrder.receiver_name == receiver_name,
                TaobaoOrder.receiver_cellphone == receiver_cellphone
            ).order_by(TaobaoOrder.create_time.desc()).one()
            return orderdata

