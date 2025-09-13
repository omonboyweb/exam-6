import React, { useState } from "react";
import { Button, Card, Collapse } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FormCategory } from "./components/formCategory";
import AddModal from "./components/add-child";
import { deletePro, deleteSubCategory, addSubCategory } from "./store/products";

const { Panel } = Collapse;

export const Products = () => {
  const products = useSelector((state) => state.productsData.products);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Modalni ochish
  const showModal = (productId) => {
    setSelectedProductId(productId); // qaysi productga child qo‘shayotganimizni saqlaymiz
    setOpen(true);
  };

  // Modaldagi "OK" tugmasi bosilganda
  const handleOk = (values) => {
    if (selectedProductId) {
      dispatch(
        addSubCategory({
          productId: selectedProductId,
          subCategory: { ...values, id: Date.now().toString() }, // yangi subCategory
        })
      );
    }
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setSelectedProductId(null);
    }, 500);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedProductId(null);
  };

  return (
    <div className="wrapper__pro">
      <FormCategory />
      <div className="products__list" style={{ display: "grid", gap: "16px" }}>
        {products.map((product) => (
          <Card
            key={product.id}
            title={product.title}
            extra={<span style={{ color: "#888" }}>{product.description}</span>}
            style={{ width: 400 }}
          >
            <Button
              danger
              onClick={() => dispatch(deletePro(product.id))}
              style={{ marginBottom: "8px" }}
            >
              Delete Product
            </Button>
            <Collapse ghost>
              <Panel header="Sub Categories" key="panel">
                {product.subCategory?.map((sub) => (
                  <div
                    key={sub.id}
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px solid #f0f0f0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <strong>{sub.title}</strong>
                      <div style={{ fontSize: "12px", color: "#888" }}>
                        {sub.description}
                      </div>
                    </div>
                    <div>
                      <Button
                        size="small"
                        danger
                        onClick={() =>
                          dispatch(
                            deleteSubCategory({
                              productId: product.id,
                              subId: sub.id,
                            })
                          )
                        }
                      >
                        Delete
                      </Button>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => showModal(product.id)}
                        style={{ marginLeft: 4 }}
                      >
                        Add Sub
                      </Button>
                    </div>
                  </div>
                ))}
                {product.subCategory.length === 0 && (
                  <Button type="dashed" onClick={() => showModal(product.id)}>
                    + Add Sub Category
                  </Button>
                )}
              </Panel>
            </Collapse>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <AddModal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
    </div>
  );
};
