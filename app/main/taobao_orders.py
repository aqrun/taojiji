from flask import render_template, jsonify, request
from flask_security import login_required
from . import main
from ..utils import json_data
from .services.taobo_order_service import TaobaoOrderService


@main.route('/tb-order-list', methods=['POST', 'GET'])
def order_list():
    current = json_data('current', 1)
    page_size = json_data('pageSize', 10)
    list_filter = json_data('filter', [])
    order = json_data('order', [])

    service = TaobaoOrderService()
    data = service.get_list(current, page_size, list_filter, order)
    return jsonify(data)
