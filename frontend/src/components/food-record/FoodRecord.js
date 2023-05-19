import React from 'react';
import { Table } from 'antd';

// Define the columns for the table
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

// Define the data source for the table
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
        // Render the table component with the defined columns, data source, and row key
        <Table columns={columns} pagination={false} rowKey={record => record.id} dataSource={dataSource} />
    );
};

export default FoodRecord;
