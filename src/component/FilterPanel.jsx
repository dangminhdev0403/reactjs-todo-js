import { CheckCircle, List, Star, Trash2 } from "lucide-react";
import React, { useMemo, useState } from "react";
import CategoryList from "./CategoryList";

const FILTER_ITEM = [
  { id: "All", label: "All", icon: <List size={24} /> },
  { id: "Completed", label: "Completed", icon: <CheckCircle size={24} /> },
  { id: "Important", label: "Important", icon: <Star size={24} /> },
  { id: "Delete", label: "Delete", icon: <Trash2 size={24} /> },
];

const FilterPanel = ({
  selectedFilter,
  setSelectedFilter,
  todoList,
  search,
  setSearch,
}) => {
  const [count, setCount] = useState({
    All: 0,
    Completed: 0,
    Important: 0,
    Delete: 0,
  });

  useMemo(() => {
    const newCount = todoList.reduce(
      (acc, cur) => {
        if (cur.isCompleted) acc.Completed += 1;
        if (cur.isImportant) acc.Important += 1;
        if (cur.isDelete) acc.Delete += 1;
        acc.All += 1;
        return acc;
      },
      { All: 0, Important: 0, Completed: 0, Delete: 0 }
    );

    setCount(newCount);

    return newCount;
  }, [todoList]);

  // console.log(filter); // Sử dụng biến để tránh cảnh báo ESLint

  return (
    <div className="filter-panel">
      <input
        type="text"
        placeholder="Search"
        name="search"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="filter-grid">
        {FILTER_ITEM.map((item) => (
          <div
            className={`filter-item ${
              selectedFilter === item.id ? "active" : ""
            }`}
            key={item.id}
            onClick={() => setSelectedFilter(item.id)}
          >
            {item.icon}
            <span>
              {item.label} ({count[item.id]})
            </span>
          </div>
        ))}
      </div>

      <CategoryList todoList={todoList} />
    </div>
  );
};

export default FilterPanel;
