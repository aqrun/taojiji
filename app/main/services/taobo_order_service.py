
from sqlalchemy import func, desc, asc
from ...models import db_session
from ...models.taobao_order import TaobaoOrder


class TaobaoOrderService:

    def get_list(self,
                 current=1,
                 page_size=10,
                 list_filter=[],
                 order=[]):
        records_total = db_session.query(func.count(TaobaoOrder.id)).one()[0]
        records_filtered = self.set_filter(db_session.query(func.count(TaobaoOrder.id)), list_filter).one()[0]

        query = self.set_filter(db_session.query(TaobaoOrder), list_filter)
        query = self.set_order(query, order)
        results = query.limit(page_size).offset((current-1) * page_size).all()

        data = []
        for o in results:
            data.append({
                'id': o.id,
                'order_id': o.order_id,
                'receiver_name': o.receiver_name,
                'receiver_address': o.receiver_address,
                'create_time': o.create_time.strftime('%Y-%m-%d %H:%M:%S'),
                'receiver_cellphone': o.receiver_cellphone,
                'logistic_company_name': o.logistic_company_name,
                'logistic_bill_number': o.logistic_bill_number,
                'created_at': o.create_time.strftime('%Y-%m-%d %H:%M:%S')
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
    def set_filter(self, query, list_filter):
        for i in list_filter:
            name = i['name']
            value = i['value']
            _type = i['type']

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

    def set_order(self, query, order):
        for i in order:
            name = i['name']
            dir = i['dir']
            sort = asc(getattr(TaobaoOrder, name)) if dir == 'asc' else desc(getattr(TaobaoOrder, name))
            query = query.order_by(sort)
        return query

    def _generate_order(self, order):
        _str = ''
        for v in order:
            _str += '%s %s' % (v['name'], v['dir'])
        return _str
