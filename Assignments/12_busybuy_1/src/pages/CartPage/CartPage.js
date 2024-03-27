import React, { useEffect, useContext, useState } from "react";
import Loader from "../../components/UI/Loader/Loader";
import styles from "./CartPage.module.css";
import { db, cartCollection, orderCollection } from "../../config/firebase";
import {
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import data from "../../utils/data";
import ProductList from "../../components/Product/ProductList/ProductList";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartPage = ({}) => {
  const [loading, setLoading] = useState();
  const [cartDetails, setCartDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchasing, setPurchasing] = useState(false);
  const navigate = useNavigate();

  // Write logic to Clear user cart
  const clearCart = async () => {
    const cartSnapshot = await getDocs(cartCollection);
    cartSnapshot.forEach(async (productDoc) => {
      await deleteDoc(doc(cartCollection, productDoc.id));
    });
  };

  // Write logic to Fetch user cart products

  const getCart = async () => {
    // const cartSnapshot = await getDocs(cartCollection);
    // if (cartSnapshot.empty) {
    //   return [];
    // }
    // const cartItems = cartSnapshot.docs.map((doc) => ({
    //   id: doc.data().id,
    //   qty: doc.data().qty,
    // }));
    // return cartItems;
    const unsub = onSnapshot(cartCollection, (snapshot) => {
      const cartItems = [];
      snapshot.forEach((product) => {
        cartItems.push({ id: product.data().id, qty: product.data().qty });
      });
      const cartData = mapCartProducts(cartItems);
      setCartDetails(cartData);
      // snapshot.docs.map((doc) => ({
      //   id: doc.data().id,
      //   qty: doc.data().qty,
      // }));
    });
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
    setLoading(true);
    const fetchCartData = async () => {
      const cartItems = await getCart();
      // const cartData = mapCartProducts(cartItems);
      // setCartDetails(cartData);
    };
    fetchCartData();
    setLoading(false);
  }, []);

  useEffect(() => {
    let total = 0;
    if (Array.isArray(cartDetails)) {
      cartDetails.map((data) => {
        total += data.quantity * data.price;
      });
    }
    setTotalPrice(total);
  }, [cartDetails]);

  const purchase = async (e) => {
    setPurchasing(true);
    e.preventDefault();
    let order = [];
    cartDetails.map((product) => {
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
    const docRef = await addDoc(orderCollection, orderObject);
    clearCart();
    setPurchasing(false);
    navigate("/myorders");
  };

  // Write logic to Remove product from cart and cart products list

  // Write logic to Remove product from the database

  if (loading) return <Loader />;

  return (
    <div className={styles.cartPageContainer}>
      {cartDetails.length !== 0 ? (
        <>
          <div className={styles.totalPrice}>
            <p>Total Price:- ₹ {totalPrice}</p>
            <button className={styles.purchaseBtn} onClick={purchase}>
              {purchasing ? "Purchasing" : "Purchase"}
            </button>
          </div>
          {/* write code here to display the item in the cart if there are items
          present in the cart. */}
          <ProductList products={cartDetails} onCart={true} />
        </>
      ) : (
        <h1>Cart is Empty!</h1>
      )}
    </div>
  );
};

export default CartPage;
