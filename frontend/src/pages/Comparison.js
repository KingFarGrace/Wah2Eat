import * as React from 'react';
import './Comparison.less';
import {Col, Row, Space, Input, Button, Card, Divider} from 'antd';
import request from '@/utils/request';

const Comparison = () => {

    // Define the state for nutritional information
    const [nutritional, setNutritional] = React.useState();

    // Define the state for nutritional List
    const [nutritionalList, setNutritionalList] = React.useState();

    // Define the state for nutritional info
    const [nutritionalInfo, setNutritionalInfo] = React.useState();

    // Define the state for food information
    const [food, setFood] = React.useState();

    // Define the state for nutritional List
    const [foodList, setFoodList] = React.useState();

    // Define the state for nutritional info
    const [foodInfo, setFoodInfo] = React.useState();

    const handleNutritionalSearch = async (keyword) => {
        const response = await request.get('/api/food/search', {
            params: {
                FoodName: keyword
            }
        });
        if (response.success) {
            setNutritionalList(response.obj);
        } else {
            setNutritionalList([]);
        }
    }

    const handleFoodSearch = async (keyword) => {
        const response = await request.get('/api/food/search', {
            params: {
                FoodName: keyword
            }
        });
        if (response.success) {
            setFoodList(response.obj);
        } else {
            setFoodList([]);
        }
    }

    return (
        <div className={'container comparison'}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card title="nutritional information" bordered={false}>
                        <Space.Compact style={{width: '100%'}}>
                            <Input value={nutritional} onChange={e => {
                                setNutritional(e.target.value)
                            }}/>
                            <Button type="primary" onClick={() => handleNutritionalSearch(nutritional)}>Submit</Button>
                        </Space.Compact>
                        <Divider/>

                        <div className="comparison-item">
                            {nutritionalList?.map((item, index) => (
                                <div
                                    className={`comparison-item-title ${nutritionalInfo?._id === item._id ? 'active' : ''}`}
                                    key={index} onClick={() => setNutritionalInfo(item)}>{item.FoodName}</div>
                            ))}
                            {nutritionalInfo && Object.keys(nutritionalInfo).filter(key => key !== 'FoodName').filter(key => key !== '_id').map((key, idx) => (
                                <ul className="comparison-item-info" key={idx}>
                                    <li>
                                        <span className="comparison-item-info-title">{key}:</span>
                                        <span>{nutritionalInfo[key]}</span>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="food comparison" bordered={false}>
                        <Space.Compact style={{width: '100%'}}>
                            <Input value={food} onChange={e => {
                                setFood(e.target.value)
                            }}/>
                            <Button type="primary" onClick={() => handleFoodSearch(nutritional)}>Submit</Button>
                        </Space.Compact>
                        <Divider/>
                        <div className="comparison-item">
                            {foodList?.map((item, index) => (
                                <div
                                    className={`comparison-item-title ${foodInfo?._id === item._id ? 'active' : ''}`}
                                    key={index} onClick={() => setFoodInfo(item)}>{item.FoodName}</div>
                            ))}
                            {foodInfo && Object.keys(foodInfo).filter(key => key !== 'FoodName').filter(key => key !== '_id').map((key, idx) => (
                                <ul className="comparison-item-info" key={idx}>
                                    <li>
                                        <span className="comparison-item-info-title">{key}:</span>
                                        <span>{foodInfo[key]}</span>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Comparison;
