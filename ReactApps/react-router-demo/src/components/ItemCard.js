import React from "react";

function ItemCard({ id, name, price, image }) {
  return (
    <div className="itemCard">
      <div className="itemName">{name}</div>
      <div className="itemPrice">&#x20B9; {price}</div>
      <div className="itemImage">
        <img src={image} alt={name + "-img"} />
      </div>
    </div>
  );
}

export default ItemCard;
