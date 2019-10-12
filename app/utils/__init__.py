from flask import request


def json_data(param_name, default_value=''):
    value_objects = request.json
    return value_objects[param_name] if param_name in value_objects else default_value

