import React, { useContext } from "react";
import { CATEGORY_ITEM } from "../constant";
import { AppContext } from "../context/AppProvider";

const CategoryList = () => {
  // =====================HOOKS==================
  const { selectedCategory, setSelectedCategory } = useContext(AppContext);

  // =====================FUNCTIONS==============

  // ====================STYLES==================
  // =====================JSX====================
  return (
    <div style={{ marginTop: "20px" }}>
      <p>List category</p>
      <div className="category-item">
        {CATEGORY_ITEM.map((item) => (
          <div
            onClick={() => setSelectedCategory(item.id)}
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "1rem",
              backgroundColor:
                selectedCategory === item.id ? "#d0d0d0" : "#f1f1f1",
            }}
          >
            <p> {item.label}</p>
            <p> 2</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
