"""
[Flask-Migrate](https://flask-migrate.readthedocs.io/en/latest/)

# 创建目录
    python manage.py db init
# 生成迁移文件
    python manage.py db migrate -m "init migrate"
# 根据迁移文件操作数据库
    python manage.py db upgrade
"""

import os
from sqlalchemy import func, and_, or_
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from flask_security.utils import hash_password
from app import app
from app.models import Base, db_session
from app.models.user_role import User, Role, RolesUsers
from app.models.taobao_order import TaobaoOrder, TaobaoProduct

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('MYSQL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
migrate = Migrate(app, Base)
manager = Manager(app)
manager.add_command('db', MigrateCommand)


@manager.command
def add_user():
    user = User(
        email='a@a.com',
        username='Alex',
        active=True
    )
    user.password = hash_password('pass2019')
    db_session.add(user)
    db_session.commit()


def set_filter(query):
    query = query.filter(or_(TaobaoOrder.id > 8, TaobaoOrder.id < 11))
    #query = query.filter(or_(TaobaoOrder.id < 11))
    return query


@manager.command
def test():
    query = db_session.query(TaobaoOrder)
    query = set_filter(query)
    print('====', query)


"""
python manage.py db init
python manage.py db migrate
python manage.py db upgrade
python manage.py db --help
"""
if __name__ == '__main__':
    manager.run()


