import time
import openpyxl
import xlrd
from datetime import datetime
from string import Template
from ...models.taobao_order import TaobaoOrder, TaobaoProduct
from ...models import db_session


class TaobaoOrderMixin:

    logistic_companies = {
        '申通快递(STO)': '申通快递',
        '百世快递': '百世汇通',
        '韵达快递': '韵达快递',
        '邮政国内小包': '邮政包裹/平邮',
        '中通快递(ZTO)': '中通快递',
        '圆通速递(YTO)': '圆通速递',
        '天天快递': '天天快递',
    }
    not_handled_companies = []

    # 入口
    def load_from_excel(self, excel_file):
        all_rows = self.get_all_data(excel_file)
        result = self.main_handle(all_rows)
        return result, self.not_handled_companies

    def get_all_data(self, source_file):
        xl = xlrd.open_workbook(source_file)
        table = xl.sheet_by_index(0)

        # order_data = {}
        order_id = ''

        nrows = table.nrows
        start_row = 1
        end_row = nrows

        i = start_row
        all_rows = {}
        while i < end_row:
            row = table.row_values(i)
            create_time = ''
            payment_time = ''
            if row[10]:
                create_time = datetime(*xlrd.xldate_as_tuple(row[10], 0))
            if row[11]:
                payment_time = datetime(*xlrd.xldate_as_tuple(row[11], 0))
            logistic_data = self.logistic_generate(row[28])

            logistic_company_name = logistic_data[0]
            logistic_bill_number = logistic_data[1]

            data = {}
            for field in TaobaoOrder.fields:
                item = TaobaoOrder.fields[field]
                data[field] = row[item['column']]

            data['logistic_company_name'] = logistic_company_name
            data['logistic_bill_number'] = logistic_bill_number
            if create_time:
                data['create_time'] = create_time
            if payment_time:
                data['payment_time'] = payment_time

            if data['order_id']:
                order_id = data['order_id']
                # order_data = data

            product = {}
            for field in TaobaoProduct.fields:
                item = TaobaoProduct.fields[field]
                product[field] = row[item['column']]
            product['order_id'] = order_id
            # print('order_id', order_id)
            # 如果存在 更新 products
            # 不存在新增order
            if order_id in all_rows:
                all_rows[order_id]['products'].append(product)
            else:
                data['products'] = [product]
                all_rows[order_id] = data

            # if i>3:
            #    break

            i += 1
        # print(all_rows)
        # exit()
        return all_rows

    def main_handle(self, all_rows):
        # repeated_orders = []
        result = True
        for order_id in all_rows:
            data = all_rows[order_id]
            if not data['logistic_company_name']:
                continue

            if not self.is_exist(order_id):
                result = self.insert_data(data)
            else:
                # repeated_orders.append(order_id)
                result = self.update_data(data)

            if not result:
                return result

        return result


        # print('重复单号: ', repeated_orders)
        # print('未处理快递名：', self.not_handled_companies)
        # print('Handle complete')

    def logistic_generate(self, data):
        if not data:
            return ('', '')
        arr = data.split(':')
        name = arr[0]
        number = arr[1]
        # name = name.replace('(STO)', '')
        if name in self.logistic_companies:
            name = self.logistic_companies[name]
        else:
            self.not_handled_companies.append(name)
        return (name, number)

    def is_exist(self, order_id):
        try:
            order = db_session.query(TaobaoOrder).filter(
                TaobaoOrder.order_id == order_id
            ).one()
            return order
        except:
            return False

    def update_data(self, data):
        # current_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
        current_time = datetime.utcnow()
        order: TaobaoOrder = None
        order = db_session.query(TaobaoOrder).filter(
            TaobaoOrder.order_id == data['order_id']
        ).one()

        order.buyer_company_name = data['buyer_company_name'],
        order.buyer_username = data['buyer_username'],
        order.seller_company_name = data['seller_company_name'],
        order.seller_username = data['seller_username'],
        order.price = data['price'],
        order.shipping_fee = data['shipping_fee'],
        order.discount = data['discount'],
        order.real_price = data['real_price'],
        order.status = data['status'],
        order.create_time = data['create_time'],
        order.payment_time = data['payment_time'],
        order.sender = data['sender'],
        order.receiver_name = data['receiver_name'],
        order.receiver_address = data['receiver_address'],
        order.receiver_postcode = data['receiver_postcode'],
        order.receiver_phone = data['receiver_phone'],
        order.receiver_cellphone = data['receiver_cellphone'],

        order.product_category = data['product_category'],
        order.comment = data['comment'],
        order.logistic_company_name = (lambda v: data[v] if v in data else '')('logistic_company_name'),
        order.logistic_bill_number = (lambda v: data[v] if v in data else '')('logistic_bill_number'),
        order.updated_at = current_time

        db_session.add(order)

        products = db_session.query(TaobaoProduct).filter(
            TaobaoProduct.order_id == data['order_id']
        ).delete()
        self.add_products(data['products'])

        try:
            # print('Updated %s' % data['receiver_name'])
            db_session.commit()
            return True
        except Exception as err:
            db_session.rollback()
            # print('Updated error: ', err)
            self.add_error('updated', err.__str__())
            return False

    def insert_data(self, data):
        # current_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
        current_time = datetime.utcnow()
        order = TaobaoOrder(
            order_id=data['order_id'],
            buyer_company_name=data['buyer_company_name'],
            buyer_username=data['buyer_username'],
            seller_company_name=data['seller_company_name'],
            seller_username=data['seller_username'],
            price=data['price'],
            shipping_fee=data['shipping_fee'],
            discount=data['discount'],
            real_price=data['real_price'],
            status=data['status'],
            sender=data['sender'],
            receiver_name=data['receiver_name'],
            receiver_address=data['receiver_address'],
            receiver_postcode=data['receiver_postcode'],
            receiver_phone=data['receiver_phone'],
            receiver_cellphone=data['receiver_cellphone'],

            product_category=data['product_category'],
            comment=data['comment'],
            logistic_company_name=(lambda v: data[v] if v in data else '')('logistic_company_name'),
            logistic_bill_number=(lambda v: data[v] if v in data else '')('logistic_bill_number'),
            created_at=current_time,
            updated_at=current_time
        )
        if data['payment_time']:
            order.payment_time = data['payment_time']
        else:
            order.payment_time = "'null'"

        if data['create_time'] != '':
            order.create_time = data['create_time']

        db_session.add(order)

        self.add_products(data['products'])

        try:
            # print('Inserted %s' % data['receiver_name'])
            db_session.commit()
            return True
        except Exception as err:
            db_session.rollback()
            self.add_error('insert', err.__str__())
            # print('Insert error: ', err)
            return False

    def add_products(self, data):
        for item in data:
            product = TaobaoProduct(
                order_id=item['order_id'],
                product_name=item['product_name'],
                unit_price=item['unit_price'],
                quantity=item['quantity'],
                unit=item['unit'],
                product_code=item['product_code'],
                spec=item['spec'],
                wuliao_code=item['wuliao_code'],
                danpin_code=item['danpin_code'],
            )
            db_session.add(product)
