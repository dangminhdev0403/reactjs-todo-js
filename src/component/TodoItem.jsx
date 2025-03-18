import React from "react";

function TodoItem(props) {
  const itemStyle = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    width: "300px",
  };

  const textStyle = {
    marginLeft: "10px",
    fontSize: "16px",
  };

  return (
    <div style={itemStyle} onClick={() => props.handleShowSidebar(props.id)}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="checkbox"
          checked={props.isCompleted}
          onChange={() => props.handleCompleteCheckbox(props.id)}
          onClick={(e) => e.stopPropagation()}
        />
        <p style={textStyle}>{props.name}</p>
      </div>

      {props.isImportant && (
        <span style={{ color: "red", fontSize: "16px" }}>&#9733; </span>
      )}
    </div>
  );
}

export default TodoItem;
