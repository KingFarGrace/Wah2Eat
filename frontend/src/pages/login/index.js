import * as React from 'react';
import './Login.less';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, message} from 'antd';
import request from '@/utils/request';
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/features/auth/authSlice';


const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        setLoading(true);

        try {
            const response = await request.post('/api/login', values);
            if(response.success || response.succuss) {
                messageApi.open({
                    type: 'success',
                    content: 'Sign in successful!'
                });
                dispatch(loginSuccess(response.obj));
                navigate('/');
                return;
            }
            messageApi.error({type: 'error', content: response.msg})
        } catch (error) {
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
