import * as React from 'react';
import './Register.less';
import {Button, Form, Input, message} from 'antd';
import {useNavigate} from "react-router-dom";
import request from '@/utils/request';

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};

const Register = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const onFinish = async ({user}) => {
        setLoading(true);
        try {
            const response = await request.post('/api/register', user);
            if(response.success || response.succuss) {
                messageApi.open({
                    type: 'success',
                    content: 'Sign up successful!'
                });
                navigate('/login');
                return;
            }
            messageApi.error({type: 'error', content: response.msg})
        } catch (error) {
            console.error(error);
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
