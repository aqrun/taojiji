import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Breadcrumb, Button,Table, Row, Col } from 'antd';
import { tableDataSelector } from '../redux/selectors/order-list-selectors';


const { Content } = Layout;

export const OrderList: React.FC = props => {
    const table_data = useSelector(tableDataSelector);

    const columns = [
      {title: '姓名', dataIndex: 'name', key: 'name',},
      {title: '年龄', dataIndex: 'age', key: 'age',},
      {title: '住址', dataIndex: 'address', key: 'address',},
    ];
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
                            <Table dataSource={table_data.toJS()}
                                columns={columns}
                                size="small" bordered
                                />
                        </div>
                    </Content>
                </Col>
            </Row>
        </Layout>
    );
};