import React, { useEffect, useState } from "react";
import Loader from "../../components/UI/Loader/Loader";
import ProductList from "../../components/Product/ProductList/ProductList";
import styles from "./CartPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  onSnapshot,
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import data from "../../utils/data";
import {
  cartSelector,
  getCart,
  setCart,
  setLoading,
  clearError,
  setPurchasing,
} from "../../redux/reducers/cartReducer";
import { authSelector } from "../../redux/reducers/authReducer";
import { toast } from "react-toastify";

const CartPage = () => {
  // Fetch all cart products for the user

  const { user } = useSelector(authSelector);
  const [totalPrice, setTotalPrice] = useState(0);

  const { loading, purchasing, error, cartProducts } =
    useSelector(cartSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Write logic to Clear user cart
  const clearCart = async () => {
    const cartSnapshot = await getDocs(
      collection(db, "userCart", user.uid, "cart")
    );
    cartSnapshot.forEach(async (productDoc) => {
      await deleteDoc(
        doc(collection(db, "userCart", user.uid, "cart"), productDoc.id)
      );
    });
  };

  const getCart = async () => {
    if (user) {
      // const cartSnapshot = await getDocs(collection(db, "userCart", user.uid, "cart"));
      // if (cartSnapshot.empty) {
      //   return [];
      // }
      // const cartItems = cartSnapshot.docs.map((doc) => ({
      //   id: doc.data().id,
      //   qty: doc.data().qty,
      // }));
      // return cartItems;
      const unsub = onSnapshot(
        collection(db, "userCart", user.uid, "cart"),
        (snapshot) => {
          const cartItems = [];
          snapshot.forEach((product) => {
            cartItems.push({ id: product.data().id, qty: product.data().qty });
          });
          const cartData = mapCartProducts(cartItems);
          dispatch(setCart(cartData));
          // snapshot.docs.map((doc) => ({
          //   id: doc.data().id,
          //   qty: doc.data().qty,
          // }));
        }
      );
    }
  };

  const mapCartProducts = (cartItems) => {
    const products = [];
    if (cartItems.length === 0) {
      return products;
    } else {
      cartItems.forEach((doc) => {
        const productId = doc.id;
        const prod = data.find((product) => product.id === productId);
        if (prod) {
          products.push({
            quantity: doc.qty,
            ...prod,
          });
        }
      });
      return products;
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchCartData = async () => {
      const cartItems = await getCart();
    };
    fetchCartData();
    dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchCartData = async () => {
      const cartItems = await getCart();
    };
    fetchCartData();
    dispatch(setLoading(false));
  }, [user]);

  // If some error occurs display the error
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);

  useEffect(() => {
    let total = 0;
    if (Array.isArray(cartProducts)) {
      cartProducts.map((data) => {
        total += data.quantity * data.price;
      });
    }
    setTotalPrice(total);
  }, [cartProducts]);

  const purchaseProductsHandler = async (e) => {
    // Write code to purchase the item present in the cart
    // Redirect the user to orders page after successful purchase
    // Clear the item present in the cart after successful purchase
    dispatch(setPurchasing(true));
    e.preventDefault();
    let order = [];
    cartProducts.map((product) => {
      const prod = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: product.quantity,
        date: new Date(),
      };
      order.push(prod);
    });

    const orderObject = {
      orders: order,
    };
    const docRef = await addDoc(
      collection(db, "userOrder", user.uid, "order"),
      orderObject
    );
    clearCart();
    dispatch(setPurchasing(true));
    navigate("/myorders");
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.cartPageContainer}>
      {/*cartProduct here is the array of item present in the cart for the user yu can change this as per your need */}
      {!!cartProducts?.length && (
        <aside className={styles.totalPrice}>
          <p>TotalPrice:- ₹{totalPrice}/-</p>
          <button
            className={styles.purchaseBtn}
            onClick={purchaseProductsHandler}
          >
            {purchasing ? "Purchasing" : "Purchase"}
          </button>
        </aside>
      )}
      {!!cartProducts?.length ? (
        <ProductList products={cartProducts} onCart={true} />
      ) : (
        <h1>Cart is Empty!</h1>
      )}
    </div>
  );
};

export default CartPage;
