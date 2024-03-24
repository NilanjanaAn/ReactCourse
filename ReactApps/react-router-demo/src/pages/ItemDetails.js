import { useParams } from "react-router-dom";
import data from "../data/itemData";

function ItemDetails() {
  const { id } = useParams();
  const item = data.find((i) => i.id === id);
  console.log(item);
  const {name, price, image}=item;
  return (
    <>
      <main>
        <h1>Item Details</h1>
      </main>
      <div className="itemDetailCard">
        <div className="itemDetailImage">
          <img src={image} alt={name+"-img"}/>
        </div>
        <div className="itemDetailName">{name}</div>
        <div className="itemDetailPrice">&#x20B9; {price}</div>
      </div>
    </>
  );
}

export default ItemDetails;
