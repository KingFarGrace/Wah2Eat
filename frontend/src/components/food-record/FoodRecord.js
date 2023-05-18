import React from 'react';
import {Table} from 'antd';

const columns = [
    {
        title: 'Dietary Intake',
        dataIndex: 'dietaryIntake',
        key: 'dietaryIntake',
    },
    {
        title: 'Recommended Value',
        dataIndex: 'recommendedValue',
        key: 'recommendedValue',
    },
    {
        title: 'Exercise Consumption',
        dataIndex: 'exerciseConsumption',
        key: 'exerciseConsumption',
    },
];

const dataSource = [
    {
        id: '1',
        dietaryIntake: 'dietaryIntake',
        recommendedValue: 'recommendedValue',
        exerciseConsumption: 'exerciseConsumption',
    },
    {
        id: '2',
        dietaryIntake: 'dietaryIntake',
        recommendedValue: 'recommendedValue',
        exerciseConsumption: 'exerciseConsumption',
    }
];

const FoodRecord = () => {
    return (
        <Table columns={columns} pagination={false} rowKey={record => record.id} dataSource={dataSource}/>
    );
};

export default FoodRecord;
