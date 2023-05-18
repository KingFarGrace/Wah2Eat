import * as React from 'react';
import {Col, Row, Space, Input, Table, Card, Button, Typography, Modal, Form, Radio, message} from 'antd';
import request from '@/utils/request';

const ResetPasswordFormModal = (
    {
        userData,
        visible,
        onAfter
    }
) => {

    const [messageApi, contextHolder] = message.useMessage();
    const [restForm] = Form.useForm();
    const [restVisible, setRestVisible] = React.useState(false);
    const [restLoading, setRestLoading] = React.useState(false);

    React.useEffect(() => {
        setRestVisible(visible);
    }, [visible]);


    const handleRest =  () => {
        restForm.validateFields().then(async (values) => {
            setRestLoading(true);
            try {
                const response = await request.post('/api/user/update/pwd', {...values, email: userData.email});
                if(response.success || response.succuss) {
                    messageApi.open({
                        type: 'success',
                        content: 'Rest Password successful!'
                    });
                    onAfter && onAfter();
                    return;
                }
                messageApi.error({type: 'error', content: response.msg})
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: 'Rest Password unsuccessful!',
                });
            } finally {
                setRestLoading(false);
            }
        }).catch((errorInfo) => {
            console.log(errorInfo);
        });
    };

    return (
        <>
            {contextHolder}
            <Modal title="Reset Password" confirmLoading={restLoading} open={restVisible} onOk={handleRest} onCancel={() => {
                onAfter && onAfter();
                restForm.resetFields();
            }}>
                <Form layout="vertical" form={restForm}>
                    <Form.Item
                        label="Old Password"
                        name="oldPwd"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your old password',
                            },
                        ]}
                    >
                        <Input.Password id="reset-oldPwd"/>
                    </Form.Item>
                    <Form.Item
                        label="New Password"
                        name="newPwd"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a new password',
                            },
                        ]}
                    >
                        <Input.Password id="reset-newPwd"/>
                    </Form.Item>
                    <Form.Item
                        label="Repeat New Password"
                        name="repeatNewPwd"
                        dependencies={['newPwd']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your new password',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPwd') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password id="reset-repeatNewPwd"/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default ResetPasswordFormModal;
