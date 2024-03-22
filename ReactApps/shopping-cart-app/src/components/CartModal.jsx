import React from "react";
import styles from "../styles/CartModal.module.css";
import { useValue } from "../itemContext";

const CartModal = () => {
  const { toggle, clear, cart, total } = useValue();
  return (
    <div className={styles.cartModal}>
      <div className={styles.closeButton} onClick={toggle}>
        Close
      </div>
      <div className={styles.clearButton} onClick={clear}>
        Clear
      </div>
      <div className={styles.itemContainer}>
        {cart.length === 0 && <h1>Hmm... looks a bit empty.</h1>}
        {cart.map((item) => (
          <div className={styles.cartCard} key={item.id}>
            <h1>{item.name}</h1>
            <h3>x {item.quantity}</h3>
            <h3>&#x20B9; {item.price * item.quantity}</h3>
          </div>
        ))}
      </div>

      <div className={styles.total}>
        <div className={styles.totalText}>Total</div>
        <div className={styles.totalPrice}>&#x20B9; {total}</div>
      </div>
    </div>
  );
};

export default CartModal;
