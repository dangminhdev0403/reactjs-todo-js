import React, { useRef, useState } from "react";
import Sidebar from "./component/Sidebar";
import TodoItem from "./component/TodoItem";

function App() {
  // ================= Hook =========================
  const refInput = useRef(null);
  const [todoList, setTodoList] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  const [isActive, setIsActive] = useState();

  const selectedTodo = todoList.find((todo) => todo.id === isActive);
  // ================= Style ========================
  const appStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const inputStyle = {
    padding: "8px",
    width: "250px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  };

  // ================ Function ======================
  const addTodo = (e) => {
    if (e.key === "Enter") {
      const newTask = refInput.current.value.trim();
      if (newTask !== "") {
        setTodoList([
          ...todoList,
          {
            id: Date.now(),
            name: newTask,
            isImportant: false,
            isCompleted: false,
          },
        ]);
        refInput.current.value = ""; // Xóa nội dung ô nhập sau khi thêm
      }
    }
  };

  const handleShowSidebar = (id) => {
    setIsActive(id);

    setShowSidebar(true);
  };

  const handleCompleteCheckbox = (id) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const hanldeChangeInfo = (todo) => {
    const newTodoList = todoList.map((item) => {
      if (item.id === todo.id) {
        return todo;
      }
      return item;
    });
    setTodoList(newTodoList);
  };

  return (
    <div style={appStyle}>
      <h2 style={{ color: "#4A90E2" }}>My Todo List</h2>
      <input
        ref={refInput}
        type="text"
        placeholder="Add a new todo"
        style={inputStyle}
        onKeyDown={addTodo}
      />
      {todoList.length === 0 && <p>No todo items</p>}{" "}
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          handeCompleteCheckbox={handleCompleteCheckbox}
          handleShowSidebar={handleShowSidebar}
        />
      ))}
      {showSidebar == true && (
        <Sidebar
          key={selectedTodo.id}
          setShowSidebar={setShowSidebar}
          selectedTodo={selectedTodo}
          handeCompleteCheckbox={handleCompleteCheckbox}
          hanldeChangeInfo={hanldeChangeInfo}
        />
      )}
    </div>
  );
}

export default App;
