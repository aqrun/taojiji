import os
from .config import *
from flask import Flask
from flask_security import Security, login_required, \
    SQLAlchemySessionUserDatastore
from .models.user_role import User, Role
from .models import db_session

from .web.hash import asset_hash
from .main import main as main_blueprint

app = Flask(__name__)

app.config['SECRET_KEY'] = 'sdfsdfsd'
app.config['SECURITY_PASSWORD_SALT'] = os.environ.get('SECURITY_PASSWORD_SALT')
app.config['BABEL_DEFAULT_LOCAL'] = 'zh_CN'
app.config['asset_hash'] = asset_hash


user_datastore = SQLAlchemySessionUserDatastore(db_session, User, Role)
security = Security(app, user_datastore)


app.register_blueprint(main_blueprint)
