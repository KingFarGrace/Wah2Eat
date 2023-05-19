import * as React from 'react';
import './Dashboard.less';
import {Space, Card, Typography, Button, Checkbox, Form, Input, message, Table, Select} from 'antd';
import {EditOutlined, ThunderboltOutlined} from "@ant-design/icons";
import {FoodPlan} from '@/components';
import {calculateBMI} from '@/utils/calculate';
import {useSelector} from "react-redux";
import EditPersonalInformationFormModal from "@/pages/components/EditPersonalInformationFormModal";
import ResetPasswordFormModal from "@/pages/components/ResetPasswordFormModal";
import request from '@/utils/request';

const {Title} = Typography;

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

const Dashboard = () => {
    // Define the form for resetting the password
    const [aimForm] = Form.useForm();
    // Retrieve the message API and context holder from the antd message hook
    const [messageApi, contextHolder] = message.useMessage();

    // State to manage the visibility of the reset password form modal
    const [restVisible, setRestVisible] = React.useState(false);

    // State to manage the visibility of the edit personal information form modal
    const [editVisible, setEditVisible] = React.useState(false);

    // State to manage the plan Data
    const [planData, setPlanData] = React.useState([]);

    // Accessing user data from the Redux store
    const userData = useSelector((state) => state.auth.userData);

    // Define the loading state of the form submission
    const [aimFormLoading, setAimFormLoading] = React.useState(false);

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

    const onFinish = (values) => {
        aimForm.validateFields().then(async (values) => {
            setAimFormLoading(true);
            try {
                // Send a request to the server to reset the password
                const response = await request.post('/api/user/plan', { ...values, email: userData.email });
                if (response.success) {
                    // Display a success message if the password reset was successful
                    messageApi.open({
                        type: 'success',
                        content: 'Reset Password successful!'
                    });
                    return;
                }
                // Display an error message if the password reset was unsuccessful
                messageApi.error({ type: 'error', content: response.msg })
            } catch (error) {
                // Display an error message if an error occurred during the password reset
                messageApi.open({
                    type: 'error',
                    content: 'Reset Password unsuccessful!',
                });
            } finally {
                setAimFormLoading(false);
            }
        }).catch((errorInfo) => {
            console.log(errorInfo);
        });
    };

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

                    {/*<Card title="Current Diet Menu" className={'card'}>*/}
                    {/*    <p>Card content</p>*/}
                    {/*    <p>Card content</p>*/}
                    {/*    <p>Card content</p>*/}
                    {/*</Card>*/}
                    <Card title="Food Plan" className={'card'}>
                        <Form
                            name="basic"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                            form={aimForm}
                            layout="inline"
                            className="plan-form"
                        >
                            <Form.Item name="aimType" label="Aim Type" rules={[{ required: true }]} style={{ width: 200}}>
                                <Select
                                    allowClear
                                >
                                    <Select.Option value="MuscleBuilding">Muscle Building</Select.Option>
                                    <Select.Option value="FatLoss">Fat loss</Select.Option>
                                    <Select.Option value="MaintainingWeight">Maintaining weight</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Aim Weight"
                                name="aimWeight"
                                rules={[{ required: true, message: 'Please input your Aim Weight!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Period Length"
                                name="periodLength"
                                rules={[{ required: true, message: 'Please input your Period Length!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" loading={aimFormLoading}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>

                        <FoodPlan dataSource={planData} />
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
