import { useContext, useReducer } from "react";

import ProductsContext from "./ProductsContext";
import { productCollection } from "../../config/firebase";
import { getDocs, query } from "firebase/firestore";

// Action types related to loading products
const LOAD_PRODUCTS_REQUEST = "LOAD_PRODUCTS_REQUEST";
const LOAD_PRODUCTS_SUCCESS = "LOAD_PRODUCTS_SUCCESS";

// Action type to set filtered products
const SET_FILTERED_PRODUCTS = "SET_FILTERED_PRODUCTS";
// Action type to set cart products
const SET_CART_PRODUCTS = "SET_CART_PRODUCTS";

// Action type to set error messages
const SET_ERROR = "SET_ERROR";
// Action type to clear any error messages in the state
const CLEAR_ERRORS = "CLEAR_ERRORS";

// Custom hook to access the ProductsContext's value
export const useProductValue = () => {
  const value = useContext(ProductsContext);
  return value;
};

const productReducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS_REQUEST:
      // When loading products, set the loading state to true
      return {
        ...state,
        loading: true,
      };

    case LOAD_PRODUCTS_SUCCESS:
      // When products are successfully loaded, update the state with the fetched products
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case SET_FILTERED_PRODUCTS:
      // When filtered products are set, update the state with the new filtered products
      return {
        ...state,
        filteredProducts: action.payload,
      };
    case SET_ERROR:
      // When an error occurs, update the state with the error message and set loading to false
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_CART_PRODUCTS:
      // When cart products are set, update the state with the new cart products
      return {
        ...state,
        cartProducts: action.payload,
      };
    case CLEAR_ERRORS:
      // When clearing errors, set the error state to null
      return {
        ...state,
        error: null,
      };
    default:
      // If none of the action types match, return the current state without any changes
      return state;
  }
};

// ProductsContextProvider component to manage the state and actions related to products
const ProductsContextProvider = ({ children }) => {
  const initialState = {
    loading: false,
    products: [],
    filteredProducts: [],
    cartProducts: [],
    error: null,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  // Function to fetch all products from the database
  const getAllProducts = async () => {
    try {
      dispatch({ type: LOAD_PRODUCTS_REQUEST });
      const productsRef = productCollection;

      const productsSnapshot = await getDocs(query(productsRef));

      // Map the fetched products to the state
      const products = productsSnapshot.docs.map((product) => ({
        ...product.data(),
      }));

      dispatch({ type: LOAD_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.message });
    }
  };

  // Function to filter products based on filter criteria
  const filterProducts = (filterObj) => {
    const {
      searchQuery,
      priceRange,
      categories: { mensFashion, womensFashion, jewelery, electronics },
    } = filterObj;

    let filteredProducts = state.products;

    // Apply title searchQuery filter
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filters
    if (mensFashion || womensFashion || jewelery || electronics) {
      filteredProducts = filteredProducts.filter((product) => {
        if (mensFashion && product.category === "men's clothing") return true;
        if (womensFashion && product.category === "women's clothing")
          return true;
        if (electronics && product.category === "electronics") return true;
        if (jewelery && product.category === "jewelery") return true;
      });
    }

    // Apply price range filter
    if (priceRange) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= priceRange
      );
    }

    dispatch({ type: SET_FILTERED_PRODUCTS, payload: filteredProducts });
  };

  const { products, filteredProducts, loading } = state;
  return (
    // Provide the products, filteredProducts, loading state, and action functions to child components
    <ProductsContext.Provider
      value={{
        products,
        filteredProducts,
        loading,
        getAllProducts,
        filterProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export default ProductsContextProvider;
