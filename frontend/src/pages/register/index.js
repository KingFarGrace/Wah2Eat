import * as React from 'react';
import './Register.less';
import {Button, Form, Input, message} from 'antd';
import {useNavigate} from "react-router-dom";
import request from '@/utils/request';

// Define the layout for the form
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

// Validation messages for form fields
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};

const Register = () => {
    // Retrieve the message API and context holder from the antd message hook
    const [messageApi, contextHolder] = message.useMessage();

    // Define the loading state of the form submission
    const [loading, setLoading] = React.useState(false);

    // Get the navigation function from react-router-dom
    const navigate = useNavigate();

    // Handle form submission
    const onFinish = async ({ user }) => {
        setLoading(true);

        try {
            // Send a register request to the server
            const response = await request.post('/api/register', user);
            if (response.success) {
                // Display a success message if the registration was successful
                messageApi.open({
                    type: 'success',
                    content: 'Sign up successful!'
                });
                // Navigate to the login page
                navigate('/login');
                return;
            }
            // Display an error message if the registration was unsuccessful
            messageApi.error({ type: 'error', content: response.msg })
        } catch (error) {
            console.error(error);
            // Display an error message if an error occurred during the registration
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
            <div className={'container register'}>
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    className={'register-form'}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                            },
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name={['user', 'username']}
                        label="Username"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name={['user', 'password']}
                        label="Password"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input type="password"/>
                    </Form.Item>
                    <Form.Item
                        name={['user', 'repeatPwd']}
                        label="Confirm Password"
                        dependencies={['user', 'password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue(['user', 'password']) === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input type="password"/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 8,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default Register;
