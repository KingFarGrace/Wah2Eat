import * as React from 'react';
import './Login.less';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, message} from 'antd';
import request from '@/utils/request';
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/features/auth/authSlice';

// Validation messages for form fields
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};

const Login = () => {
    // Retrieve the message API and context holder from the antd message hook
    const [messageApi, contextHolder] = message.useMessage();

    // Define the loading state of the form submission
    const [loading, setLoading] = React.useState(false);

    // Get the navigation function from react-router-dom
    const navigate = useNavigate();

    // Get the dispatch function from react-redux
    const dispatch = useDispatch();

    // Handle form submission
    const onFinish = async (values) => {
        setLoading(true);

        try {
            // Send a login request to the server
            const response = await request.post('/api/login', values);
            if (response.success) {
                // Display a success message if the login was successful
                messageApi.open({
                    type: 'success',
                    content: 'Sign in successful!'
                });
                // Dispatch the login success action to update the authentication state
                dispatch(loginSuccess(response.obj));
                // Navigate to the home page
                navigate('/');
                return;
            }
            // Display an error message if the login was unsuccessful
            messageApi.error({ type: 'error', content: response.msg })
        } catch (error) {
            // Display an error message if an error occurred during the login
            messageApi.open({
                type: 'error',
                content: 'Sign in unsuccessful!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {contextHolder}
            <div className={'login'}>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                            },
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Email"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-submit" loading={loading}>
                            Log in
                        </Button>
                        Or <a href="/register">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default Login;
