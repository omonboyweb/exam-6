import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Collapse } from "antd";

const { Panel } = Collapse;

const SubCategoryPage = () => {
  const { parentId } = useParams();
  const products = useSelector((state) => state.productsData.products);

  const parent = products.find((p) => p.id === parentId);

  if (!parent) return <div>Parent topilmadi</div>;

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <Card title={parent.title} extra={parent.description}>
        <Collapse ghost>
          <Panel header="Sub Categories" key="1">
            {parent.subCategory.map((sub) => (
              <div
                key={sub.id}
                style={{ padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}
              >
                <strong>{sub.title}</strong>
                <div style={{ fontSize: 12, color: "#888" }}>
                  {sub.description}
                </div>
              </div>
            ))}
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
};

export default SubCategoryPage;
