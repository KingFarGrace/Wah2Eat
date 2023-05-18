import * as React from 'react';
import './Answer.less';
import {Col, Row, Space, Input, Button, Card, Divider, message} from 'antd';
import {AudioOutlined} from "@ant-design/icons";
import request from '@/utils/request';

const {Search} = Input;

const answerMenuItems = [
    {id: 1, name: 'weight'},
    {id: 2, name: 'weight loss indicators'},
    {id: 3, name: 'weight loss principle'},
    {id: 4, name: 'basal metabolism'},
    {id: 5, name: 'obesity factor'},
    {id: 6, name: 'how to make a plan'},
];

const Answer = () => {
    const [selectedMenuKey, setSelectedMenuKey] = React.useState(1);
    const [keyword, setKeyword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [items, setItems] = React.useState([]);

    const onSearch = async (value) => {
        setLoading(true);
        try {
            const response = await request.get('/api/qa', {
                params: {
                    keyword: value
                }
            });
            if(response.success || response.succuss) {
                setItems(response.obj)
            }
        } catch (error) {
            console.error(error);
            messageApi.open({
                type: 'error',
                content: 'Sign up unsuccessful!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}

            <div className={'container answer'}>
                <div className={'answer-menu'}>
                    <Card title="Food Leaderboard">
                        <ul className="answer-menu-list">
                            {answerMenuItems.map(item => (
                                <li
                                    className={`answer-menu-item ${selectedMenuKey === item.id ? 'active' : ''}`}
                                    key={item.id}
                                    onClick={() => {
                                        setSelectedMenuKey(item.id)
                                        setKeyword(item.name)
                                        onSearch(item.name)
                                    }}
                                >
                                    <span>{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
                <div className="answer-content">
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        value={keyword}
                        onSearch={onSearch}
                        onChange={e => setKeyword(e.target.value)}
                        loading={loading}
                    />
                    <div className={'answer-list'}>
                        {items?.map((item, index) => (
                            <div key={index} className={'answer-list-item'}>
                                <div className={'answer-list-item-question'}>{item.question}</div>
                                <div className={'answer-list-item-answer'}>{item.answer}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Answer;
