import * as React from 'react';
import './Leaderboard.less';
import { Card } from 'antd';

// Leaderboard menu items
const leaderboardMenuItems = [
    { id: 1, name: 'comprehensive' },
    { id: 2, name: 'popular' },
    { id: 3, name: 'lose weight' },
    { id: 4, name: 'muscle gain' },
    { id: 5, name: 'gout' },
    { id: 6, name: 'other' },
];

const Leaderboard = () => {
    // State to track the selected menu key
    const [selectedMenuKey, setSelectedMenuKey] = React.useState(1);

    return (
        <div className="container leaderboard">
            {/* Card component for the leaderboard menu */}
            <Card title="Food Leaderboard" className="leaderboard-menu">
                <ul className="leaderboard-menu-list">
                    {/* Rendering leaderboard menu items */}
                    {leaderboardMenuItems.map((item) => (
                        <li
                            className={`leaderboard-menu-item ${selectedMenuKey === item.id ? 'active' : ''}`}
                            key={item.id}
                            onClick={() => setSelectedMenuKey(item.id)}
                        >
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </Card>

            {/* Content section of the leaderboard */}
            <div className="leaderboard-content">
                111 {/* Placeholder content */}
            </div>
        </div>
    );
};

export default Leaderboard;
