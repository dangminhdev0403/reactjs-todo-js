import anime from "animejs/lib/anime.es.js"; // Import AnimeJS
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import FilterPanel from "./component/FilterPanel";
import Sidebar from "./component/Sidebar";
import TodoItem from "./component/TodoItem";
import { AppContext } from "./context/AppProvider";

function App() {
  // ================= Hook =========================
  const refInput = useRef(null);
  const sidebarRef = useRef(null); // Ref cho Sidebar
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      name: "Learn React",
      isImportant: false,
      isCompleted: false,
      isDelete: false,
      category: "personal",
    },
    {
      id: 2,
      name: "Learn Nodejs",
      isImportant: false,
      isCompleted: false,
      isDelete: false,
      category: "personal",
    },
  ]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isActive, setIsActive] = useState();
  const [selectedFilter, setSelectedFilter] = React.useState("All");

  const selectedTodo = todoList.find((todo) => todo.id === isActive);

  const [search, setSearch] = useState("");
  const { selectedCategory } = useContext(AppContext);

  const filterTodo = useMemo(() => {
    return todoList.filter((todo) => {
      if (!todo.name.includes(search)) return false;
      if (selectedCategory && todo.category !== selectedCategory) return false;
      if (selectedFilter === "All") {
        return true;
      }
      if (selectedFilter === "Important") return todo.isImportant;
      if (selectedFilter === "Completed") return todo.isCompleted;
      if (selectedFilter === "Delete") return todo.isDelete;
    });
  }, [selectedFilter, todoList, search, selectedCategory]);

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

  // ================= Animation với AnimeJS ========================
  useEffect(() => {
    if (showSidebar && sidebarRef.current) {
      // Animation khi Sidebar xuất hiện
      anime({
        targets: sidebarRef.current,
        translateX: ["100%", "0%"], // Trượt từ bên phải vào
        opacity: [0, 1], // Từ trong suốt đến rõ
        duration: 300,
        easing: "easeInOutQuad",
      });
    }
  }, [showSidebar]);

  const hideSidebarWithAnimation = () => {
    anime({
      targets: sidebarRef.current,
      translateX: "100%", // Trượt ra bên phải
      opacity: 0, // Biến mất
      duration: 300,
      easing: "easeInOutQuad",
      complete: () => setShowSidebar(false), // Ẩn Sidebar sau khi animation hoàn tất
    });
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
            isDelete: false,
            category: "personal",
          },
        ]);
        refInput.current.value = "";
      }
    }
  };

  const handleShowSidebar = (id) => {
    setIsActive(id);
    setShowSidebar(true); // Hiển thị Sidebar và chạy animation
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
    <div className="container">
      <FilterPanel
        search={search}
        setSearch={setSearch}
        todoList={todoList}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div style={appStyle} className="main-content">
        <h2 style={{ color: "#4A90E2" }}>My Todo List</h2>
        <input
          ref={refInput}
          type="text"
          placeholder="Add a new todo"
          style={inputStyle}
          onKeyDown={addTodo}
        />
        {todoList.length === 0 && <p>No todo items</p>}
        {filterTodo.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            handeCompleteCheckbox={handleCompleteCheckbox}
            handleShowSidebar={handleShowSidebar}
          />
        ))}
        {showSidebar && (
          <div ref={sidebarRef} style={{ position: "fixed", right: 0, top: 0 }}>
            <Sidebar
              key={selectedTodo.id}
              setShowSidebar={hideSidebarWithAnimation} // Truyền hàm ẩn với animation
              selectedTodo={selectedTodo}
              handeCompleteCheckbox={handleCompleteCheckbox}
              hanldeChangeInfo={hanldeChangeInfo}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
