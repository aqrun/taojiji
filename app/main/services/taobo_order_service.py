import datetime
from sqlalchemy import func, desc, asc
from ...models import db_session
from ...models.taobao_order import TaobaoOrder
from . import BaseService
from ..mixins.taobao_order_mixin import TaobaoOrderMixin
from ..mixins.excel_handle_mixin import ExcelHandleMixin


class TaobaoOrderService(BaseService, TaobaoOrderMixin, ExcelHandleMixin):

    def get_list(self,
                 current=1,
                 page_size=10,
                 list_filter=None,
                 sort=None):
        list_filter = {} if list_filter is None else list_filter
        sort = {} if sort is None else sort

        records_total = db_session.query(func.count(TaobaoOrder.id)).one()[0]
        records_filtered = self.set_filter(db_session.query(func.count(TaobaoOrder.id)), list_filter).one()[0]

        query = self.set_filter(db_session.query(TaobaoOrder), list_filter)
        query = self.set_sort(query, sort)
        # print(query)
        results = query.limit(page_size).offset((current-1) * page_size).all()

        data = []
        for o in results:
            created_at = o.create_time + datetime.timedelta(hours=8)
            data.append({
                'id': o.id,
                'order_id': o.order_id,
                'receiver_name': o.receiver_name,
                'receiver_address': o.receiver_address,
                'create_time': o.create_time.strftime('%Y-%m-%d %H:%M:%S'),
                'receiver_cellphone': o.receiver_cellphone,
                'logistic_company_name': o.logistic_company_name,
                'logistic_bill_number': o.logistic_bill_number,
                'created_at': created_at.strftime('%Y-%m-%d %H:%M:%S')
            })

        return {
            'result': 1 if results else 0,
            'records_total': records_total,
            'records_filtered': records_filtered,
            'data': data,
            'current': current,
            'page_size': page_size
        }

    """
    == > < >= <=
    """
    @staticmethod
    def set_filter(query, list_filter):
        for item in list_filter.values():
            name = item['name']
            value = item['value']
            _type = item['type']

            if _type == '==':
                query = query.filter(getattr(TaobaoOrder, name) == value)
            elif _type == '>':
                query = query.filter(getattr(TaobaoOrder, name) > value)
            elif _type == '<':
                query = query.filter(getattr(TaobaoOrder, name) < value)
            elif _type == '>=':
                query = query.filter(getattr(TaobaoOrder, name) >= value)
            elif _type == '<=':
                query = query.filter(getattr(TaobaoOrder, name) <= value)
        return query

    @staticmethod
    def set_sort(query, sort):
        for item in sort.values():
            name = item['name']
            sort_dir = item['dir']
            sort = asc(getattr(TaobaoOrder, name)) if sort_dir == 'asc' else desc(getattr(TaobaoOrder, name))
            query = query.order_by(sort)
        return query



