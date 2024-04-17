import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import ProductList from "../../components/Product/ProductList/ProductList";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import Loader from "../../components/UI/Loader/Loader";

import { useSelector, useDispatch } from "react-redux";
import {
  filter,
  getAllProducts,
  productsSelector,
} from "../../redux/reducers/productsReducer";
import { addDataToCollection } from "../../utils/utils";

function HomePage() {
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState(75000);
  const [categories, setCategories] = useState({
    mensFashion: false,
    electronics: false,
    jewelery: false,
    womensClothing: false,
  });

  const dispatch = useDispatch();
  const { loading, products, filteredProducts, error } =
    useSelector(productsSelector);

  useEffect(() => {
    addDataToCollection();
  }, []);

  // Fetch products on app mount
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  // Rerender the products if the search or filter parameters change
  useEffect(() => {
    dispatch(filter({ priceRange, searchQuery: query, categories }));
  }, [products, priceRange, query, categories]);

  // Display loader while products are fetching using the Loader Component
  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.homePageContainer}>
      <FilterSidebar
        setPriceRange={setPriceRange}
        setCategories={setCategories}
        priceRange={priceRange}
      />
      <form className={styles.form}>
        <input
          type="search"
          placeholder="Search By Name"
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {filteredProducts.length ? (
        <ProductList products={filteredProducts.length ? filteredProducts : null} />
      ) : null}
    </div>
  );
}

export default HomePage;
