import random
import string
from flask import request


def json_data(param_name, default_value=''):
    value_objects = request.json
    return value_objects[param_name] if param_name in value_objects else default_value


def random_string(num=8):
    """生成随机字符串"""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=num))

