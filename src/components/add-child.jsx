import React from "react";
import { Modal, Form, Input } from "antd";

const AddModal = ({ open, onOk, onCancel, confirmLoading }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onOk(values); // Parent komponentga qiymatlarni yuboradi
      form.resetFields(); // Formani tozalaydi
    } catch (errorInfo) {
      console.log("Form validation failed:", errorInfo);
    }
  };

  return (
    <Modal
      title="Yangi SubCategory qo‘shish"
      open={open}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      okText="Add"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Title kiritish shart!" }]}
        >
          <Input placeholder="Subcategory title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Description kiritish shart!" }]}
        >
          <Input placeholder="Subcategory description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
