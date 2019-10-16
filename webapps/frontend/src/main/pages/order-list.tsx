import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Layout, Breadcrumb, Button,Table, Row, Col } from 'antd';
import {
    pagerSelector,
    tableDataSelector,
    tableLoadingSelector
} from '../redux/selectors/order-list-selectors';
import * as actions from '../redux/actions/order-list-actions';
import { initialSort } from '../redux/reducers/order-list-reducer';


const { Content } = Layout;

export const OrderList: React.FC = props => {
    let table_data = useSelector(tableDataSelector);
    let pager = useSelector(pagerSelector);
    let table_loading = useSelector(tableLoadingSelector);
    const store = useStore();
    const dispatch = useDispatch();

    const columns = [
        {title: 'ID', dataIndex: 'id', key: 'id', sorter: true, width: 60},
        {title: '订单号', dataIndex: 'order_id', key: 'order_id',},
        {title: '收货人', dataIndex: 'receiver_name', key: 'receiver_name',},
        {title: '电话', dataIndex: 'receiver_cellphone', key: 'receiver_cellphone',},
        {title: '收货地址', dataIndex: 'receiver_address', key: 'receiver_address',},
        {title: '快递公司', dataIndex: 'logistic_company_name', key: 'logistic_company_name',},
        {title: '运单号', dataIndex: 'logistic_bill_number', key: 'logistic_bill_number',},
        {title: '下单时间', dataIndex: 'create_time', key: 'create_time',sorter:true, width:150},
    ];

    const fetchTableList = ()=>{
        const state = store.getState().orderList.get('table').toJS();
        // console.log('store', state.pager);
        //console.log('fetch table list', state.pager);
        const params = {
            current: state.pager.current,
            pageSize: state.pager.pageSize,
            sort: state.sort,
            filter: {...state.search_filter, ...state.table_filter},
        };
        dispatch(actions.refreshTableList(state.pager, params));
    };


    const handleTableChange = (pagination:any, filters:any, sorter:any) => {
        const state = store.getState().orderList.get('table').toJS();
        //console.log(pagination, filters, sorter);
        let _pager = {...state.pager,
            current: pagination.current,
            pageSize: pagination.pageSize,
        };
        let current = _pager.current;
        let _sort:{[k: string]: any} = {};
        let hasOrder = false;
        if(typeof sorter.columnKey!='undefined'){
            let key:string = sorter.columnKey;
            let dir = sorter.order == 'ascend'?'asc':'desc';
            _sort[key] = {name: key, dir: dir};
            //current = 1;
            hasOrder = true;
        }
        _sort = hasOrder?_sort:initialSort;
        _pager.current = current;

        dispatch(actions.setPager(_pager));
        dispatch(actions.setSort(_sort));
        //console.log('handle change', _pager, _sort);
        setTimeout(()=>{
            fetchTableList();
        },0)
    };
    //component did mount
    useEffect(() => {
        fetchTableList()
    }, []);

    return (
        <Layout className="layout" style={{background:'white'}}>
            <Row>
                <Col span={24}>
                    <Content>
                        <Breadcrumb>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                        </Breadcrumb>
                        <div>
                            <div className="clearfix" style={{margin:'10px 0'}}>
                                <Button icon="plus" type="primary"
                                    size="small"
                                    >输入淘宝订单</Button>
                                <Button icon="upload" type="primary"
                                    size="small" style={{marginLeft:'15px'}}
                                    >处理淘集集订单</Button>
                            </div>
                            <Table
                                dataSource={table_data.toJS()}
                                columns={columns}
                                loading={table_loading}
                                pagination={pager.toJS()}
                                onChange={handleTableChange}
                                size="small" bordered
                                rowKey="id"
                                />
                        </div>
                    </Content>
                </Col>
            </Row>
        </Layout>
    );
};