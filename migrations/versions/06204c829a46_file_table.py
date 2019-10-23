"""file table

Revision ID: 06204c829a46
Revises: 0605f5d831a3
Create Date: 2019-10-23 10:34:27.549252

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '06204c829a46'
down_revision = '0605f5d831a3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('files',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('uri', sa.String(length=255), nullable=False),
    sa.Column('extension', sa.String(length=32), nullable=True),
    sa.Column('location', sa.String(length=32), nullable=False),
    sa.Column('status', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('files')
    # ### end Alembic commands ###
