import React from "react";

const CATEGORY_ITEM = [
  {
    id: "personal",
    label: "Personal",
  },
  {
    id: "work",
    label: "Work",
  },
  {
    id: "idea",
    label: "Idea",
  },
];
const CategoryList = () => {
  // =====================HOOKS==================

  // =====================FUNCTIONS==============

  // =====================JSX====================
  return (
    <div>
      <p>List category</p>
      <div className="category-item" style={{ display: "flex" }}>
        {CATEGORY_ITEM.map((item) => (
          <div key={item.id}>
            <p> {item.label}</p>
            <p> 2</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
