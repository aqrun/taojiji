from sqlalchemy import Column, Integer, String, DECIMAL, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from . import Base


class TaobaoOrder(Base):
    __tablename__ = 'taobao_orders'

    id = Column(Integer, primary_key=True)
    order_id = Column(String(64), unique=True, nullable=False, comment='订单编号')
    buyer_company_name = Column(String(250), nullable=True, default='', comment='买家公司名')
    buyer_username = Column(String(128), nullable=True, default='', comment='买家会员名')
    seller_company_name = Column(String(250), nullable=True, default='', comment='卖家会员名')
    seller_username = Column(String(128), nullable=True, default='', comment='卖家会员名')
    price = Column(DECIMAL(10, 2), nullable=True, comment='货品总价')
    shipping_fee = Column(DECIMAL(10, 2), nullable=True, comment='运费')
    discount = Column(DECIMAL(10, 2), nullable=True, comment='折扣或涨价')
    real_price = Column(DECIMAL(10, 2), nullable=True, comment='实付款')
    status = Column(String(128), nullable=True, default='', comment='订单状态')
    create_time = Column(DateTime(), nullable=True, comment='订单创建时间')
    payment_time = Column(DateTime(), nullable=True, comment='订单付款时间')
    sender = Column(String(250), nullable=True, default='', comment='发货方')
    receiver_name = Column(String(128), nullable=True, default='', comment='收货人姓名')
    receiver_address = Column(String(250), nullable=True, default='', comment='收货地址')
    receiver_postcode = Column(String(20), nullable=True, default='', comment='邮编')
    receiver_phone = Column(String(250), nullable=True, default='', comment='联系电话')
    receiver_cellphone = Column(String(250), nullable=True, default='', comment='联系手机')
    product_category = Column(String(20), nullable=True, default='', comment='货品种类')
    comment = Column(String(250), nullable=True, default='', comment='买家留言')
    logistic_company_name = Column(String(250), nullable=True, default='', comment='物流公司')
    logistic_bill_number = Column(String(64), nullable=True, default='', comment='物流单号')
    created_at = Column(DateTime(), nullable=True)
    updated_at = Column(DateTime(), nullable=True)

    fields = {
        'order_id': {'name': 'order_id', 'column': 0},
        'buyer_company_name': {'name': '', 'column': 1},
        'buyer_username': {'name': '', 'column': 2},
        'seller_company_name': {'name': '', 'column': 3},
        'seller_username': {'name': 'seller_username', 'column': 4},
        'price': {'name': 'price', 'column': 5},
        'shipping_fee': {'name': 'shipping_fee', 'column': 6},
        'discount': {'name': 'discount', 'column': 7},
        'real_price': {'name': 'real_price', 'column': 8},
        'status': {'name': 'status', 'column': 9},
        'create_time': {'name': 'create_time', 'column': 10},
        'payment_time': {'name': 'payment_time', 'column': 11},
        'sender': {'name': 'sender', 'column': 12},
        'receiver_name': {'name': 'receiver_name', 'column': 13},
        'receiver_address': {'name': 'receiver_address', 'column': 14},
        'receiver_postcode': {'name': 'receiver_postcode', 'column': 15},
        'receiver_phone': {'name': 'receiver_phone', 'column': 16},
        'receiver_cellphone': {'name': 'receiver_cellphone', 'column': 17},
        'product_category': {'name': 'product_category', 'column': 26},
        'comment': {'name': 'comment', 'column': 27},
        # 'logistics': {'name': 'logistics', 'column':28},
    }


class TaobaoProduct(Base):
    __tablename__ = 'taobao_products'

    id = Column(Integer, primary_key=True)
    order_id = Column(String(64), ForeignKey('taobao_orders.order_id', ondelete='CASCADE'))
    product_name = Column(String(250), nullable=True, default='', comment='货品标题')
    unit_price = Column(DECIMAL(10,2), nullable=True, comment='单价')
    quantity = Column(Integer(), nullable=True, default=0, comment='数量')
    unit = Column(String(20), nullable=True, default='', comment='单位')
    product_code = Column(String(128), nullable=True, default='', comment='货号')
    spec = Column(String(32), nullable=True, default='', comment='型号')
    wuliao_code = Column(String(32), nullable=True, default='', comment='物料编号')
    danpin_code = Column(String(32), nullable=True, default='', comment='单品货号')
    taobao_order = relationship("TaobaoOrder", backref="taobao_products_of_taobao_orders")

    fields = {
        'product_name': {'name':'product_name', 'column':18},
        'unit_price': {'name':'unit_price', 'column':19},
        'quantity': {'name':'quantity', 'column':20},
        'unit': {'name':'unit', 'column': 21},
        'product_code': {'name':'product_code', 'column':22},
        'spec': {'name':'spec', 'column': 23},
        'wuliao_code': {'name':'wuliao_code', 'column':24},
        'danpin_code': {'name':'danpin_code', 'column':25},
    }
