import { React, useState } from "react";
import { Card, Collapse, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FormCategory } from "./components/formCategory";
import AddModal from "./components/add-child";

import { deletePro, deleteSubCategory, addSubCategory } from "./store/products";

const { Panel } = Collapse;

const ProductsPage = () => {
  const products = useSelector((state) => state.productsData.products);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const showModal = (productId) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

  const handleOk = (values) => {
    if (selectedProductId) {
      dispatch(
        addSubCategory({
          productId: selectedProductId,
          subCategory: { ...values, id: Date.now().toString() },
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
      <div style={{ display: "grid", gap: 16 }}>
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
              style={{ marginBottom: 8 }}
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
                      <div style={{ fontSize: 12, color: "#888" }}>
                        {sub.description}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
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

      <AddModal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ProductsPage;
