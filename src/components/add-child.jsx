import React from "react";
import { Modal, Form, Input } from "antd";

const AddModal = ({ open, onOk, onCancel, confirmLoading }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onOk(values); // parentga values jo‘natamiz
        form.resetFields();
      })
      .catch((info) => console.log("Validate Failed:", info));
  };

  return (
    <Modal
      title="Yangi SubCategory qo‘shish"
      open={open}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Title kiritish shart!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Description kiritish shart!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
