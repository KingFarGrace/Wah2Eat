import * as React from 'react';
import './Answer.less';
import {Input, Card, message} from 'antd';
import request from '@/utils/request';

const { Search } = Input;

// Define the menu items for answer selection
const answerMenuItems = [
    { id: 1, name: 'weight' },
    { id: 2, name: 'weight loss indicators' },
    { id: 3, name: 'weight loss principle' },
    { id: 4, name: 'basal metabolism' },
    { id: 5, name: 'obesity factor' },
    { id: 6, name: 'how to make a plan' },
];

const Answer = () => {
    // Define the selected menu key state
    const [selectedMenuKey, setSelectedMenuKey] = React.useState(1);

    // Define the keyword state for searching
    const [keyword, setKeyword] = React.useState('');

    // Define the loading state of the search
    const [loading, setLoading] = React.useState(false);

    // Retrieve the message API and context holder from the antd message hook
    const [messageApi, contextHolder] = message.useMessage();

    // Define the items state for displaying search results
    const [items, setItems] = React.useState([]);

    // Handle search
    const onSearch = async (value) => {
        setLoading(true);

        try {
            // Send a search request to the server
            const response = await request.get('/api/qa', {
                params: {
                    keyword: value
                }
            });
            if (response.success) {
                // Update the items state with the search results
                setItems(response.obj);
            } else {
                setItems([]);
            }
        } catch (error) {
            console.error(error);
            // Display an error message if the search was unsuccessful
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
                                <div className={'answer-list-item-question'}>Q：{item.question}</div>
                                <div className={'answer-list-item-answer'}>A：{item.answer}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Answer;
