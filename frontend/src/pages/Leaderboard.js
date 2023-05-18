import * as React from 'react';
import './Leaderboard.less';
import {Col, Row, Space, Input, Button, Card, Divider} from 'antd';

const leaderboardMenuItems = [
    {id: 1, name: 'comprehensive'},
    {id: 2, name: 'popular'},
    {id: 3, name: 'lose weight'},
    {id: 4, name: 'muscle gain'},
    {id: 5, name: 'gout'},
    {id: 6, name: 'other'},
];

const Leaderboard = () => {

    const [selectedMenuKey, setSelectedMenuKey] = React.useState(1)

    return (
        <div className={'container leaderboard'}>
            <Card title="Food Leaderboard" className={'leaderboard-menu'}>
                <ul className="leaderboard-menu-list">
                    {leaderboardMenuItems.map(item => (
                        <li
                            className={`leaderboard-menu-item ${selectedMenuKey === item.id ? 'active': ''}`}
                            key={item.id} onClick={() => setSelectedMenuKey(item.id)}
                        >
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </Card>
            <div className="leaderboard-content">
                111
            </div>
        </div>
    );
}

export default Leaderboard;
