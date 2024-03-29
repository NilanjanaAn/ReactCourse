import React, { useEffect, useState, useContext } from "react";
import styles from "./HomePage.module.css";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import { useProductValue } from "../../context/Products/ProductsState";
import Loader from "../../components/UI/Loader/Loader";
import ProductList from "../../components/Product/ProductList/ProductList";
import { addDataToCollection } from "../../utils/utils";

function HomePage() {
  // Write logic to Fetch products on app mount
  // useState() hook for initial state set and render automatically

  const [searchProduct, setsearch] = useState("");
  const [priceRange, setPriceRange] = useState(75000);

  const [categories, setCategories] = useState({
    mensFashion: false,
    electronics: false,
    jewelery: false,
    womensFashion: false,
  });

  const {
    products,
    loading,
    getAllProducts,
    filterProducts,
    filteredProducts,
  } = useProductValue();

  // initial when component did mount all product show in the home page
  useEffect(() => {
    addDataToCollection();
    getAllProducts();
  }, []);

  // Write logic to Rerender the products if the search or filter parameters change
  useEffect(() => {
    filterProducts({ priceRange, searchQuery: searchProduct, categories });
  }, [products, priceRange, searchProduct, categories]);

  // Display loader while products are fetching
  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.homePageContainer}>
      <FilterSidebar
        setCategories={setCategories}
        setPriceRange={setPriceRange}
        priceRange={priceRange}
      />
      <form className={styles.form}>
        <input
          type="search"
          placeholder="Search By Name"
          className={styles.searchInput}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
      </form>
      {/* Write logic to display the product using the ProductList */}
      {filteredProducts.length ? (
        <ProductList
          products={filteredProducts.length ? filteredProducts : null}
        />
      ) : null}
    </div>
  );
}

export default HomePage;
