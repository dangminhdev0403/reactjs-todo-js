import React from "react";

// Tạo Context
const AppContext = React.createContext();

// Component Provider
const AppProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = React.useState();

  return (
    <AppContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </AppContext.Provider>
  );
};

// Export cả AppContext và AppProvider
export { AppContext, AppProvider };
