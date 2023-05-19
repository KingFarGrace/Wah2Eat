import * as React from 'react';
import './Dashboard.less';
import {Space, Card, Typography} from 'antd';
import {EditOutlined, ThunderboltOutlined} from "@ant-design/icons";
import {FoodRecord} from '@/components';
import {calculateBMI} from '@/utils/calculate';
import {useSelector} from "react-redux";
import EditPersonalInformationFormModal from "@/pages/components/EditPersonalInformationFormModal";
import ResetPasswordFormModal from "@/pages/components/ResetPasswordFormModal";

const {Title} = Typography;

const Dashboard = () => {
    // State to manage the visibility of the reset password form modal
    const [restVisible, setRestVisible] = React.useState(false);

    // State to manage the visibility of the edit personal information form modal
    const [editVisible, setEditVisible] = React.useState(false);

    // Accessing user data from the Redux store
    const userData = useSelector((state) => state.auth.userData);

    return (
        <>
            <div className={'container dashboard'}>
                <div className="dashboard-header">
                    <Title level={2}>Personal Information</Title>
                    <Space size={20}>
                        <div className="dashboard-header-action" onClick={() => setEditVisible(true)}>
                            <EditOutlined/>
                            <span>Edit Personal Information</span>
                        </div>
                        <div className="dashboard-header-action" onClick={() => setRestVisible(true)}>
                            <ThunderboltOutlined/>
                            <span>Reset Password</span>
                        </div>
                    </Space>
                </div>
                <div className="dashboard-context">
                    <Card title="BMI" className={'card'}>
                        {calculateBMI(userData?.weight, userData?.height)}
                    </Card>

                    <Card title="Food Record" className={'card'}>
                        <FoodRecord />
                    </Card>

                    <Card title="Current Diet Menu" className={'card'}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                    <Card title="My Goal" className={'card'}>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
            </div>

            {/* Edit Personal Information */}
            <EditPersonalInformationFormModal userData={userData} visible={editVisible} onAfter={() => {
                setEditVisible(false);
            }} />

            {/* Reset Password */}
            <ResetPasswordFormModal userData={userData} visible={restVisible} onAfter={() => {
                setRestVisible(false);
            }} />
        </>
    );
}

export default Dashboard;
