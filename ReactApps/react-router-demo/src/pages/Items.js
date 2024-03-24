import data from "../data/itemData";
import ItemCard from "../components/ItemCard";
import { Link } from "react-router-dom";

function Items() {
  return (
    <>
      <main>
        <h1>Items Page</h1>
        <div className="itemsWrapper">
          {data.map((item) => (
            <Link to={"/items/"+item.id} key={item.id}>
              <ItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export default Items;
