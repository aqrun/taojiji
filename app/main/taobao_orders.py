from flask import render_template, jsonify, request, current_app
from flask_security import login_required
from . import main
from ..utils import json_data, random_string
from .services.taobo_order_service import TaobaoOrderService
from .services.file_service import FileService


@main.route('/tb-order-list', methods=['POST', 'GET'])
def order_list():
    current = json_data('current', 1)
    page_size = json_data('pageSize', 10)
    list_filter = json_data('filter', None)
    sort = json_data('sort', None)

    service = TaobaoOrderService()
    data = service.get_list(current, page_size, list_filter, sort)
    return jsonify(data)


@main.route('/upload', methods=['GET', 'POST'])
def upload():
    url_type = request.values.get('type', 'input')
    file_service = FileService()
    file_data = file_service.upload()

    try:
        if url_type == 'handle':
            data = _handle_upload(file_data)
        else:
            data = _input_upload(file_data)
    except Exception as e:
        data = {
            'status': 'error',
            'msg': '文件上传失败',
            'error': str(e)
        }

    return jsonify(data)


def _input_upload(file_data):
    taobao_order_service = TaobaoOrderService()
    file = file_data['file_path']
    result, not_handle_list = taobao_order_service.load_from_excel(file)

    data = {
        # 'values': request.values,
        'result': result,
        'status': 'done' if result else 'error',
        'url': file_data['url'],
        'thumbUrl': file_data['url'],
        'uri': file_data['uri'],
        'name': file_data['filename'],
        'extension': file_data['extension'],
        'not_handle_list': not_handle_list
    }
    return data


def _handle_upload(file_data):
    taobao_order_service = TaobaoOrderService()
    taobao_order_service.repeated_data = []
    file = file_data['file_path']
    repeated_data = taobao_order_service.handle_excel(file)

    data = {
        # 'values': request.values,
        'result': 1,
        'status': 'done',
        'url': file_data['url'],
        'thumbUrl': file_data['url'],
        'uri': file_data['uri'],
        'name': file_data['filename'],
        'extension': file_data['extension'],
        'repeated': repeated_data
    }
    return data
