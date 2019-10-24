"""empty message

Revision ID: fdae8a8a7871
Revises: 
Create Date: 2019-10-24 23:44:09.359342

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fdae8a8a7871'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('files',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.Column('uri', sa.String(length=250), nullable=False),
    sa.Column('extension', sa.String(length=32), nullable=True),
    sa.Column('location', sa.String(length=32), nullable=False),
    sa.Column('status', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('role',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=True),
    sa.Column('description', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('taobao_orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('order_id', sa.String(length=64), nullable=False, comment='订单编号'),
    sa.Column('buyer_company_name', sa.String(length=250), nullable=True, comment='买家公司名'),
    sa.Column('buyer_username', sa.String(length=128), nullable=True, comment='买家会员名'),
    sa.Column('seller_company_name', sa.String(length=250), nullable=True, comment='卖家会员名'),
    sa.Column('seller_username', sa.String(length=128), nullable=True, comment='卖家会员名'),
    sa.Column('price', sa.DECIMAL(precision=10, scale=2), nullable=True, comment='货品总价'),
    sa.Column('shipping_fee', sa.DECIMAL(precision=10, scale=2), nullable=True, comment='运费'),
    sa.Column('discount', sa.DECIMAL(precision=10, scale=2), nullable=True, comment='折扣或涨价'),
    sa.Column('real_price', sa.DECIMAL(precision=10, scale=2), nullable=True, comment='实付款'),
    sa.Column('status', sa.String(length=128), nullable=True, comment='订单状态'),
    sa.Column('create_time', sa.DateTime(), nullable=True, comment='订单创建时间'),
    sa.Column('payment_time', sa.DateTime(), nullable=True, comment='订单付款时间'),
    sa.Column('sender', sa.String(length=250), nullable=True, comment='发货方'),
    sa.Column('receiver_name', sa.String(length=128), nullable=True, comment='收货人姓名'),
    sa.Column('receiver_address', sa.String(length=250), nullable=True, comment='收货地址'),
    sa.Column('receiver_postcode', sa.String(length=20), nullable=True, comment='邮编'),
    sa.Column('receiver_phone', sa.String(length=250), nullable=True, comment='联系电话'),
    sa.Column('receiver_cellphone', sa.String(length=250), nullable=True, comment='联系手机'),
    sa.Column('product_category', sa.String(length=20), nullable=True, comment='货品种类'),
    sa.Column('comment', sa.String(length=250), nullable=True, comment='买家留言'),
    sa.Column('logistic_company_name', sa.String(length=250), nullable=True, comment='物流公司'),
    sa.Column('logistic_bill_number', sa.String(length=64), nullable=True, comment='物流单号'),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('order_id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=250), nullable=True),
    sa.Column('username', sa.String(length=128), nullable=True),
    sa.Column('password', sa.String(length=128), nullable=True),
    sa.Column('last_login_at', sa.DateTime(), nullable=True),
    sa.Column('current_login_at', sa.DateTime(), nullable=True),
    sa.Column('last_login_ip', sa.String(length=100), nullable=True),
    sa.Column('current_login_ip', sa.String(length=100), nullable=True),
    sa.Column('login_count', sa.Integer(), nullable=True),
    sa.Column('active', sa.Boolean(), nullable=True),
    sa.Column('confirmed_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('roles_users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('role_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['role_id'], ['role.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('taobao_products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('order_id', sa.String(length=64), nullable=True),
    sa.Column('product_name', sa.String(length=250), nullable=True, comment='货品标题'),
    sa.Column('unit_price', sa.DECIMAL(precision=10, scale=2), nullable=True, comment='单价'),
    sa.Column('quantity', sa.Integer(), nullable=True, comment='数量'),
    sa.Column('unit', sa.String(length=20), nullable=True, comment='单位'),
    sa.Column('product_code', sa.String(length=128), nullable=True, comment='货号'),
    sa.Column('spec', sa.String(length=32), nullable=True, comment='型号'),
    sa.Column('wuliao_code', sa.String(length=32), nullable=True, comment='物料编号'),
    sa.Column('danpin_code', sa.String(length=32), nullable=True, comment='单品货号'),
    sa.ForeignKeyConstraint(['order_id'], ['taobao_orders.order_id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('taobao_products')
    op.drop_table('roles_users')
    op.drop_table('user')
    op.drop_table('taobao_orders')
    op.drop_table('role')
    op.drop_table('files')
    # ### end Alembic commands ###
