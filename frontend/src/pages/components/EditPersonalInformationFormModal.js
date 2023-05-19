import * as React from 'react';
import { Input, Modal, Form, Radio, message } from 'antd';
import request from '@/utils/request';
import { useDispatch } from "react-redux";
import { loginSuccess } from '@/features/auth/authSlice';

const EditPersonalInformationFormModal = (
    {
        userData,
        visible,
        onAfter
    }
) => {
    const [editForm] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [editVisible, setEditVisible] = React.useState(false);
    const [editLoading, setEditLoading] = React.useState(false);
    const dispatch = useDispatch();

    // Set form fields with user data when the modal becomes visible
    React.useEffect(() => {
        if (visible) {
            editForm.setFieldsValue(userData || {});
        }
    }, [visible, userData]);

    // Update the visibility state of the modal
    React.useEffect(() => {
        setEditVisible(visible);
    }, [visible]);

    // Handle the edit action
    const handleEdit = async () => {
        editForm.validateFields().then(async (values) => {
            setEditLoading(true);
            try {
                // Make a request to update the user information
                const response = await request.post('/api/user/update', { ...values, email: userData.email });
                if (response.success || response.succuss) {
                    // Display success message and update user data in Redux store
                    messageApi.open({
                        type: 'success',
                        content: 'Edit Personal Information successful!'
                    });
                    dispatch(loginSuccess({ ...userData, ...values }));
                    onAfter && onAfter();
                    return;
                }
                // Display error message if the request was not successful
                messageApi.error({ type: 'error', content: response.msg });
            } catch (error) {
                // Display error message if an exception occurred during the request
                messageApi.open({
                    type: 'error',
                    content: 'Edit Personal Information unsuccessful!',
                });
            } finally {
                setEditLoading(false);
            }
        }).catch((errorInfo) => {
            console.log(errorInfo);
        });
    }

    return (
        <>
            {contextHolder}
            <Modal title="Edit Personal Information" confirmLoading={editLoading} open={editVisible} onOk={handleEdit} onCancel={() => {
                onAfter && onAfter();
                editForm.resetFields();
            }}>
                <Form layout="vertical" form={editForm}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email',
                            },
                            {
                                type: 'email',
                                message: 'Please enter a valid email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your username',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your gender',
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                            <Radio value="other">Other</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="height"
                        label="Height"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Height',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="weight"
                        label="Weight"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Weight',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default EditPersonalInformationFormModal;
