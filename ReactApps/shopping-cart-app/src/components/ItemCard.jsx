import React from "react";
import styles from "../styles/ItemCard.module.css";
import { useValue } from "../itemContext";

function ItemCard({ id, name, price, image }) {
  const { handleAdd, handleRemove } = useValue();

  // relocated to itemContext.js where all the logic is kept

  // const handleAdd = (e) => {
  //   e.preventDefault();
  //   setTotal((prev) => prev + price);
  //   setItem((prev) => prev + 1);
  // };

  // const handleRemove = (e) => {
  //   e.preventDefault();
  //   if (total > 0) {
  //     setTotal((prev) => prev - price);
  //     setItem((prev) => prev - 1);
  //   }
  // };

  return (
    <div className={styles.itemCard}>
      <div className={styles.itemName}>{name}</div>
      <div className={styles.itemPrice}>&#x20B9; {price}</div>
      <div className={styles.image}>
        <img src={image} alt={name+"-img"}/>
      </div>
      <div className={styles.itemButtonsWrapper}>
        <button
          className={styles.itemButton}
          onClick={(e) => handleAdd(e, { id, name, price })}
        >
          Add
        </button>
        <button
          className={styles.itemButton}
          onClick={(e) => handleRemove(e, { id, price })}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
