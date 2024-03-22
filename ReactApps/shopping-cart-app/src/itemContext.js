import { useContext } from "react";
import { createContext, useState } from "react";
import CartModal from "./components/CartModal";

const itemContext = createContext();

// custom hook
function useValue() {
  const value = useContext(itemContext);
  return value;
}

const CustomItemContext = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [item, setItem] = useState(0);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleAdd = (e, prod) => {
    e.preventDefault();
    setTotal((prev) => prev + prod.price);
    const index = cart.findIndex((i) => i.id === prod.id);
    if (index !== -1) {
      cart[index].quantity++;
      setCart(cart);
    } else setCart([...cart, { ...prod, quantity: 1 }]);
    setItem(item + 1);
  };

  const handleRemove = (e, prod) => {
    e.preventDefault();
    const index = cart.findIndex((i) => i.id === prod.id);
    if (index !== -1) {
      cart[index].quantity--;
      if (cart[index].quantity === 0) cart.splice(index, 1);
      setCart(cart);
      setTotal((prev) => prev - prod.price);
      setItem(item - 1);
    }
  };

  const clear = (e) => {
    e.preventDefault();
    setCart([]);
    setTotal(0);
    setItem(0);
  };

  const toggle = (e) => {
    e.preventDefault();
    setShowCart(!showCart);
  };

  return (
    <itemContext.Provider
      value={{
        total,
        setTotal,
        item,
        cart,
        setCart,
        handleAdd,
        handleRemove,
        clear,
        toggle,
      }}
    >
      {showCart && <CartModal />}
      {children}
    </itemContext.Provider>
  );
};

export { itemContext, useValue };
export default CustomItemContext;
