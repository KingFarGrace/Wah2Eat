import * as React from 'react';
import './Comparison.less';
import { Col, Row, Space, Input, Button, Card, Divider } from 'antd';

const Comparison = () => {

    // Define the state for nutritional information
    const [nutritional, setNutritional] = React.useState();

    // Define the state for food information
    const [food, setFood] = React.useState();

    return (
        <div className={'container comparison'}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="nutritional information" bordered={false}>
                        <Space.Compact style={{ width: '100%' }}>
                            <Input value={nutritional} onChange={e => {
                                setNutritional(e.target.value)
                            }} />
                            <Button type="primary">Submit</Button>
                        </Space.Compact>
                        <Divider />
                        <div className="comparison-item">1</div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="food comparison" bordered={false}>
                        <Space.Compact style={{ width: '100%' }}>
                            <Input value={food} onChange={e => {
                                setFood(e.target.value)
                            }} />
                            <Button type="primary">Submit</Button>
                        </Space.Compact>
                        <Divider />
                        <div className="comparison-item">1</div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Comparison;
