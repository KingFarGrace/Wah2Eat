import React from 'react';
import { Table } from 'antd';

// Define the columns for the table
const columns = [
    {
        title: 'Carbs',
        dataIndex: 'nutriReq',
        key: 'nutriReq.carbs',
        render: (record) => record.carbs
    },
    {
        title: 'Fat',
        dataIndex: 'nutriReq',
        key: 'nutriReq.fat',
        render: (record) => record.fat
    },
    {
        title: 'Protein',
        dataIndex: 'nutriReq',
        key: 'nutriReq.protein',
        render: (record) => record.protein
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
];

const FoodPlan = ({ dataSource = [] }) => {
    return (
        // Render the table component with the defined columns, data source, and row key
        <Table columns={columns} pagination={false} rowKey={record => record.date} dataSource={dataSource} />
    );
};

export default FoodPlan;
