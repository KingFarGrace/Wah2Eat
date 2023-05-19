import React from 'react';
import './Home.less';
import {Col, Row, Card} from "antd";
import {ReactComponent as IconAnswer} from "@/assets/answer.svg";
import {ReactComponent as IconDietMenu} from "@/assets/diet-menu.svg";
import {ReactComponent as IconFood} from "@/assets/food.svg";
import {ReactComponent as IconRanking} from "@/assets/ranking.svg";
import {FoodPlan} from '@/components';
import {useSelector} from "react-redux";
import {calculateBMI} from '@/utils/calculate';
import {useNavigate} from "react-router-dom";
import request from '@/utils/request';

const Home = () => {
    // Checking if the user is logged in
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    // Accessing user data from the Redux store
    const userData = useSelector((state) => state.auth.userData);

    // React Router's navigate function for navigation
    const navigate = useNavigate();

    // State to manage the plan Data
    const [planData, setPlanData] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const response = await request.get('/api/user/plan', {
                params: {
                    email: userData.email
                }
            });

            if(response.success) {
                setPlanData(response.obj.plan);
            } else {
                setPlanData([]);
            }
        })();
    }, [])

    return (
        <div className="container home">
            <Row justify="space-between" gutter={20}>
                <Col span={6}>
                    <div className="home-menu-item" onClick={() => {
                        navigate('');
                    }}>
                        <IconFood className={'home-menu-item-icon'}/>
                        <span className={'home-menu-item-title'}>Nutria information</span>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="home-menu-item" onClick={() => {
                        navigate('/leaderboard');
                    }}>
                        <IconRanking className={'home-menu-item-icon'}/>
                        <span className={'home-menu-item-title'}>Food ranking</span>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="home-menu-item" onClick={() => {
                        navigate('/food-price');
                    }}>
                        <IconDietMenu className={'home-menu-item-icon'}/>
                        <span className={'home-menu-item-title'}>Food Price</span>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="home-menu-item" onClick={() => {
                        navigate('/answer');
                    }}>
                        <IconAnswer className={'home-menu-item-icon'}/>
                        <span className={'home-menu-item-title'}>Health quiz</span>
                    </div>
                </Col>
            </Row>
            {isLoggedIn && (
                <Row gutter={20} className={'home-personal-information'}>
                    <Col span={18} push={6}>
                        <Card title="Food Plan">
                            <FoodPlan dataSource={planData} />
                        </Card>
                        {/*<Card title="Current Diet Menu" style={{marginTop: 20}}>*/}

                        {/*</Card>*/}
                    </Col>
                    <Col span={6} pull={18}>
                        <Card title="BMI">
                            {calculateBMI(userData?.weight, userData?.height)}
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default Home;
