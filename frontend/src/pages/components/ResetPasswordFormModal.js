import * as React from 'react';
import {Input,  Modal, Form, message} from 'antd';
import request from '@/utils/request';

const ResetPasswordFormModal = (
    {
        userData,
        visible,
        onAfter
    }
) => {

    // Retrieve the message API and context holder from the antd message hook
    const [messageApi, contextHolder] = message.useMessage();

    // Define the form for resetting the password
    const [restForm] = Form.useForm();

    // Define the visibility state of the modal
    const [restVisible, setRestVisible] = React.useState(false);

    // Define the loading state of the form submission
    const [restLoading, setRestLoading] = React.useState(false);

    // Update the visibility state when the `visible` prop changes
    React.useEffect(() => {
        setRestVisible(visible);
    }, [visible]);


    // Handle the password reset form submission
    const handleRest = () => {
        restForm.validateFields().then(async (values) => {
            setRestLoading(true);
            try {
                // Send a request to the server to reset the password
                const response = await request.post('/api/user/update/pwd', { ...values, email: userData.email });
                if (response.success || response.succuss) {
                    // Display a success message if the password reset was successful
                    messageApi.open({
                        type: 'success',
                        content: 'Reset Password successful!'
                    });
                    // Call the `onAfter` callback if provided
                    onAfter && onAfter();
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
