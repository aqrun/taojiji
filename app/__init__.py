import os
from .config import *
from flask import Flask, render_template
from flask_security import Security, login_required, \
    SQLAlchemySessionUserDatastore
from .models.user_role import User, Role
from .models import db_session

from .web.hash import asset_hash
from .main import main as main_blueprint

app = Flask(__name__)

app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SECRET_KEY'] = 'sdfsdfsd'
app.config['SECURITY_PASSWORD_SALT'] = os.environ.get('SECURITY_PASSWORD_SALT')
app.config['BABEL_DEFAULT_LOCAL'] = 'zh_CN'
app.config['asset_hash'] = asset_hash


user_datastore = SQLAlchemySessionUserDatastore(db_session, User, Role)
security = Security(app, user_datastore)


log_file = os.path.abspath(os.path.join(app.root_path, "../logging/app.log"))
import logging
from logging.handlers import RotatingFileHandler
file_handler = RotatingFileHandler(log_file, maxBytes=1024 * 1024 * 100, backupCount=20)
file_handler.setLevel(logging.ERROR)
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
file_handler.setFormatter(formatter)
app.logger.addHandler(file_handler)


@app.errorhandler(500)
def internal_error(exception):
    app.logger.error(exception)
    return render_template('500.html'), 500


app.register_blueprint(main_blueprint)
