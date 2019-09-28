import os
from flask.cli import load_dotenv


def check_env():
    print('check env')
    if not os.environ.get('APP_NAME'):
        load_dotenv(os.path.abspath(os.path.join(os.path.dirname(__file__), "../.env")))
