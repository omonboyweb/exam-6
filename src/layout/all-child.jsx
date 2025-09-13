import React, { useState } from "react";
import { Table, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteSubCategory, addSubCategory } from "../store/products";
import AddModal from "../components/add-child";

// parent ichidagi barcha childlarni tekislaymiz
const flattenSubCategories = (products) => {
  let result = [];
  products.forEach((p) => {
    if (p.subCategory && p.subCategory.length) {
      p.subCategory.forEach((sub) => {
        result.push({
          ...sub,
          parentId: p.id,
          parentTitle: p.title,
        });
      });
    }
  });
  return result;
};

const SubCategoryPage = () => {
  const products = useSelector((state) => state.productsData.products);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);

  const showModal = (parentId) => {
    setSelectedParent(parentId);
    setOpen(true);
  };

  const handleOk = (values) => {
    if (selectedParent) {
      dispatch(
        addSubCategory({
          productId: selectedParent,
          subCategory: { ...values, id: Date.now().toString() },
        })
      );
    }
    setOpen(false);
    setSelectedParent(null);
  };

  const handleCancel = () => setOpen(false);

  const dataSource = flattenSubCategories(products);

  const columns = [
    {
      title: "Parent Category",
      dataIndex: "parentTitle",
      key: "parentTitle",
    },
    {
      title: "SubCategory Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            size="small"
            danger
            onClick={() =>
              dispatch(
                deleteSubCategory({
                  productId: record.parentId,
                  subId: record.id,
                })
              )
            }
          >
            Delete
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={() => showModal(record.parentId)}
          >
            Add
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>All SubCategories</h2>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 5 }}
      />
      <AddModal open={open} onOk={handleOk} onCancel={handleCancel} />
    </div>
  );
};

export default SubCategoryPage;
