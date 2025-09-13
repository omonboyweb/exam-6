import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../store/products";
import { nanoid } from "@reduxjs/toolkit";

export const FormCategory = () => {
  const products = useSelector((state) => state.productsData.products);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (value) => {
    const formatted = value.products.map((product) => ({
      ...product,
      id: nanoid(), // kategoriya id
      subCategory:
        product.subCategory?.map((sub) => ({
          ...sub,
          id: nanoid(), // har bir subcategory id
        })) || [],
    }));

    formatted.forEach((product) => {
      dispatch(addCategory(product)); // har birini alohida qo‘shadi
    });
    console.log(formatted);
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: 600, width: "100%" }}
      initialValues={{ products: [{}] }}
      onFinish={onFinish}
    >
      <Form.List name="products">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field) => (
              <Card size="small" title={`Category`} key={field.key}>
                <Form.Item label="Title" name={[field.name, "title"]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name={[field.name, "description"]}
                >
                  <Input />
                </Form.Item>

                {/* Nest Form.List */}
                <Form.Item label="Sub category">
                  <Form.List name={[field.name, "subCategory"]}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, "title"]}>
                              <Input placeholder="Title" />
                            </Form.Item>
                            <Form.Item
                              noStyle
                              name={[subField.name, "description"]}
                            >
                              <Input placeholder="Description" />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => subOpt.add()}
                          block
                        >
                          + Add Sub Item
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}
            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>
    </Form>
  );
};
