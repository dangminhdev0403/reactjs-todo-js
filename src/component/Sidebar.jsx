import React, { useState } from "react";
import { CATEGORY_ITEM } from "../constant";

const Sidebar = (props) => {
  const data = props.selectedTodo;
  const [name, setName] = useState(props.selectedTodo.name);
  const [isImportant, setIsImportant] = useState(
    props.selectedTodo.isImportant
  );
  const [isCompleted, setIsCompleted] = useState(
    props.selectedTodo.isCompleted
  );

  const [category, setCategory] = useState(data.category);

  // ===================== STYLE ==================

  const styleSidebar = {
    position: "fixed",
    top: "0",
    right: "0",
    width: "300px",
    height: "100vh",
    backgroundColor: "#ffffff",
    padding: "20px",
    boxShadow: "-3px 0 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    margin: "5px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  };

  const checkboxContainer = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "10px 0",
  };

  const buttonContainer = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  };

  const buttonStyle = {
    flex: "1",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "14px",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  };

  const saveButton = {
    ...buttonStyle,
    backgroundColor: "#4CAF50",
    color: "white",
  };

  const cancelButton = {
    ...buttonStyle,
    backgroundColor: "#f44336",
    color: "white",
    marginLeft: "10px",
  };

  //==========================FUNTION=================
  const handleCancel = (e) => {
    e.preventDefault();
    props.setShowSidebar(false);
  };

  const handleSave = (e) => {
    const newTodo = { ...data, name, isImportant, isCompleted, category };
    props.hanldeChangeInfo(newTodo);
    e.preventDefault();
    props.setShowSidebar(false);
  };
  // ===================== JSX =====================
  return (
    <div style={styleSidebar}>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 style={{ color: "#4A90E2" }}>Edit Todo List</h2>
        <div>
          <label htmlFor="sb-name">Todo Name</label>
          <input
            type="text"
            id="sb-name"
            name="name"
            style={inputStyle}
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={checkboxContainer}>
          <label htmlFor="sb-important">Is Important</label>
          <input
            type="checkbox"
            id="sb-important"
            name="sb-important"
            defaultChecked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
          />
        </div>

        <div style={checkboxContainer}>
          <label htmlFor="sb-complete">Is Completed</label>
          <input
            type="checkbox"
            id="sb-complete"
            name="sb-complete"
            defaultChecked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
        </div>
        <div style={checkboxContainer}>
          <label htmlFor="sb-category">Is category</label>
          <select
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORY_ITEM.map((item) => (
              <option
                key={item.id}
                value={item.id}
                selected={item.id === category}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div style={buttonContainer}>
          <button style={saveButton} onClick={(e) => handleSave(e)}>
            Save
          </button>
          <button
            style={cancelButton}
            onClick={(e) => {
              handleCancel(e);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sidebar;
