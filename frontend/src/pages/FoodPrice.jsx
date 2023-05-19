import * as React from 'react';
import "./FoodPrice.less";
import {Button, Card, Col, Divider, Input, Row, Space, Table} from "antd";
import request from '@/utils/request';

// Define the columns for the table
const columns = [
    {
        title: 'Food Name',
        dataIndex: 'FoodName',
        key: 'FoodName',
    },
    {
        title: 'Ave',
        dataIndex: 'ave',
        key: 'ave',
    },
    {
        title: 'Max',
        dataIndex: 'max',
        key: 'max',
    },
    {
        title: 'Min',
        dataIndex: 'min',
        key: 'min',
    },
];


const FoodPrice = () => {

    // Define the state for keyword
    const [keyword, setKeyword] = React.useState();
    const [dataSource, setDataSource] = React.useState([]);


    const handlePriceSearch = async () => {
        const response = await request.get('/api/price/search', {
            params: {
                FoodName: keyword
            }
        });
        if (response.success) {
            setDataSource(response.obj);
        } else {
            setDataSource([]);
        }
    }

    return (
        <div className="container food-price">
            <Card title="Food Price" bordered={false}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Space.Compact style={{width: '100%'}}>
                            <Input value={keyword} onChange={e => {
                                setKeyword(e.target.value)
                            }}/>
                            <Button type="primary" onClick={() => handlePriceSearch()}>Submit</Button>
                        </Space.Compact>
                    </Col>
                    <Col span={24}>
                        <Divider/>
                        {/* Render the table component with the defined columns, data source, and row key */}
                        <Table columns={columns} pagination={false} rowKey={record => record._id} dataSource={dataSource} />
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default FoodPrice;
