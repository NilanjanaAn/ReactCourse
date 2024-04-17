// Implement your code for cart reducer

import {
  getDocs,
  collection,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  cartProducts: [],
  purchasing: false,
  loading: false,
  error: "",
};

export const clearCart = createAsyncThunk(
  "cart/clear",
  async ({ uid }, thunkAPI) => {
    const cartSnapshot = await getDocs(collection(db, "userCart", uid, "cart"));
    cartSnapshot.forEach(async (productDoc) => {
      await deleteDoc(
        doc(collection(db, "userCart", uid, "cart"), productDoc.id)
      );
    });
  }
);

// export const getCart = createAsyncThunk(
//   "cart/fetch",
//   async ({ uid }, thunkAPI) => {
//     return await getDocs(collection(db, "userCart", uid, "cart"));
//   }
// );

// export const purchase = createAsyncThunk(
//   "cart/purchase",
//   async ({ e, uid }, thunkAPI) => {
//     e.preventDefault();
//     const state = thunkAPI.getState();
//     let order = [];
//     state.cartProducts.map((product) => {
//       const prod = {
//         id: product.id,
//         title: product.title,
//         price: product.price,
//         quantity: product.quantity,
//         date: new Date(),
//       };
//       order.push(prod);
//     });

//     const orderObject = {
//       orders: order,
//     };
//     return await addDoc(collection(db, "userOrder", uid, "order"), orderObject);
//   }
// );

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    clearError: (state, action) => {
      state.error = false;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCart: (state, action) => {
      state.cartProducts = action.payload;
    },
    setPurchasing: (state, action) => {
      state.purchasing = action.payload;
    },
  },
//   extraReducers: (builder) => {
//     builder
    //   .addCase(getCart.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(getCart.fulfilled, (state, action) => {
    //     const cartSnapshot = action.payload;
    //     const cartItems = [];
    //     cartSnapshot.forEach((product) => {
    //       console.log("product.data().id", product.data().id);
    //       cartItems.push({
    //         id: product.data().id,
    //         qty: product.data().qty,
    //       });
    //     });
    //     console.log("cartItems", cartItems);
    //     const cartData = mapCartProducts(cartItems);
    //     console.log("cartData", cartData);
    //     state.cartProducts = cartData;
    //     state.loading = false;
    //   })
    //   .addCase(getCart.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })
    //   .addCase(purchase.pending, (state) => {
    //     state.purchasing = true;
    //   })
    //   .addCase(purchase.fulfilled, (state, action) => {
    //     clearCart();
    //     state.purchasing = false;
    //     const navigate = useNavigate();
    //     navigate("/myorders");
    //   })
    //   .addCase(purchase.rejected, (state, action) => {
    //     state.purchasing = false;
    //     state.error = action.payload.message;
    //   });
//   },
});

export const cartReducer = cartSlice.reducer;
export const { clearError, setLoading, setCart, setPurchasing } =
  cartSlice.actions;
export const cartSelector = (state) => state.cart;
