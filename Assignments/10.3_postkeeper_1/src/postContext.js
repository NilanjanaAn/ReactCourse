// create post context here
import { createContext, useContext, useState } from "react";

const postContext = createContext();

// Create custom hook that returns context value here

function useValue() {
  const value = useContext(postContext);
  return value;
}

// create a custom saved post provider here with add and reset functions

const CustomPostContext = ({ children }) => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [showSavedList, setShowSavedList] = useState(false);

  const add = (e, p) => {
    e.preventDefault();
    console.log(p);
    setSavedPosts([p,...savedPosts]);
  };

  const reset = (e) => {
    e.preventDefault();
    setSavedPosts([]);
  };
  return (
    <postContext.Provider
      value={{
        savedPosts,
        setSavedPosts,
        showSavedList,
        setShowSavedList,
        add,
        reset,
      }}
    >
      {children}
    </postContext.Provider>
  );
};

export default CustomPostContext;

export { postContext, useValue };
