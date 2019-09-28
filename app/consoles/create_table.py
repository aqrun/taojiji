#! python

from ..models import init_db, db_session
from .. import user_datastore


def create_user():
    init_db()
    user_datastore.create_user(email='aqrun@qq.com', password='123')
    db_session.commit()


if __name__ == '__main__':
    # create_user()
    print('this is console')
