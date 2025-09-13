import React from "react";
import { Card, Collapse, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deletePro, deleteSubCategory } from "../store/products";
import AddModal from "../components/add-child";

const { Panel } = Collapse;

const ProductsPage = () => {
  const products = useSelector((state) => state.productsData.products);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [selectedParent, setSelectedParent] = React.useState(null);

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

  return (
    <div style={{ display: "grid", gap: 16, padding: 16 }}>
      {products.map((product) => (
        <Card
          key={product.id}
          title={product.title}
          extra={<span style={{ color: "#888" }}>{product.description}</span>}
        >
          <Button
            danger
            style={{ marginBottom: 8 }}
            onClick={() => dispatch(deletePro(product.id))}
          >
            Delete Parent
          </Button>

          <Collapse ghost>
            <Panel header="Sub Categories" key="panel">
              {product.subCategory?.map((sub) => (
                <div
                  key={sub.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "4px 0",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <div>
                    <strong>{sub.title}</strong>
                    <div style={{ fontSize: 12, color: "#888" }}>
                      {sub.description}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
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
                      Add
                    </Button>
                  </div>
                </div>
              ))}
              {product.subCategory.length === 0 && (
                <Button type="dashed" onClick={() => showModal(product.id)}>
                  + Add SubCategory
                </Button>
              )}
            </Panel>
          </Collapse>
        </Card>
      ))}

      <AddModal open={open} onOk={handleOk} onCancel={handleCancel} />
    </div>
  );
};

export default ProductsPage;
