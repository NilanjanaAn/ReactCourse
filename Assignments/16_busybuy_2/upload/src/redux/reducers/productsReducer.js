// Implement your code for product reducer
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../config/firebase";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  products: [],
  filteredProducts: [],
  error: "",
};

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const productsRef = collection(db, "products");
    return await getDocs(query(productsRef));
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    filter: (state, action) => {
      const {
        searchQuery,
        priceRange,
        categories: { mensFashion, womensFashion, jewelery, electronics },
      } = action.payload;

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

      state.filteredProducts = filteredProducts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        const products = action.payload.docs.map((product) => ({
          ...product.data(),
        }));

        state.products = products;
        state.filteredProducts = products;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const productsReducer = productsSlice.reducer;
export const { filter } = productsSlice.actions;
export const productsSelector = (state) => state.products;
