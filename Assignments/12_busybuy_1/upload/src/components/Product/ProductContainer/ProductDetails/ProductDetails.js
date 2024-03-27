import React, { useState, useContext } from "react";
import styles from "./ProductDetails.module.css";
import MinusIcon from "../../../UI/Icons/MinusIcon";
import PlusIcon from "../../../UI/Icons/PlusIcon";
import { useAuthValue } from "../../../../context/Auth/AuthState";
import { useNavigate } from "react-router-dom";
import { db, cartCollection } from "../../../../config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const ProductDetails = ({ productId, title, onCart, price, quantity }) => {
  const [productAddingToCart, setProductAddingToCart] = useState(false);
  const [productRemovingFromCart, setProductRemovingCart] = useState(false);

  const { isAuthenticated, user } = useAuthValue();
  const navigate = useNavigate();

  // Create a Function to add product to cart
  const handleAdd = async (e) => {
    e.preventDefault();

    if (isAuthenticated && user) {
      setProductAddingToCart(true);
      const querySnapshot = await getDocs(
        query(cartCollection, where("id", "==", productId))
      );
      if (querySnapshot.empty) {
        await addDoc(cartCollection, {
          id: productId,
          qty: 1,
        });
      } else {
        const productDoc = querySnapshot.docs[0];
        let qty = productDoc.data().qty;
        qty = qty + 1;
        const docRef = doc(cartCollection, productDoc.id);
        await updateDoc(docRef, {
          qty,
        });
      }
      toast.success("Product added successfully!");
      setProductAddingToCart(false);
    } else navigate("/signin");
  };

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      setProductRemovingCart(true);
      const querySnapshot = await getDocs(
        query(cartCollection, where("id", "==", productId))
      );

      if (!querySnapshot.empty) {
        const productDoc = querySnapshot.docs[0];
        await deleteDoc(doc(cartCollection, productDoc.id));
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setProductRemovingCart(false);
    }
  };

  // Create a new cart if it does not exist

  // Create a function to remove the cart

  //Create a Function for Handling the product quantity increase
  const increaseQuantity = async (e) => {
    const querySnapshot = await getDocs(
      query(cartCollection, where("id", "==", productId))
    );
    const productDoc = querySnapshot.docs[0];
    let qty = productDoc.data().qty;
    qty = qty + 1;
    const docRef = doc(cartCollection, productDoc.id);
    await updateDoc(docRef, {
      qty,
    });
  };

  //Create a function for  Handling the product quantity decrease
  const decreaseQuantity = async (e) => {
    const querySnapshot = await getDocs(
      query(cartCollection, where("id", "==", productId))
    );
    const productDoc = querySnapshot.docs[0];
    let qty = productDoc.data().qty;
    qty = qty - 1;
    if (qty === 0) {
      await deleteDoc(doc(cartCollection, productDoc.id));
    } else {
      const docRef = doc(cartCollection, productDoc.id);
      await updateDoc(docRef, {
        qty,
      });
    }
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.productName}>
        <p>{`${title.slice(0, 35)}...`}</p>
      </div>
      <div className={styles.productOptions}>
        <p>₹ {price}</p>
        {onCart && (
          <div className={styles.quantityContainer}>
            <MinusIcon handleRemove={decreaseQuantity} />
            <p>{quantity}</p>
            <PlusIcon handleAdd={increaseQuantity} />
          </div>
        )}
      </div>
      {/* Conditionally Rendering buttons based on the screen */}
      {!onCart ? (
        <button
          className={styles.addBtn}
          title="Add to Cart"
          onClick={handleAdd}
        >
          {productAddingToCart ? "Adding" : "Add To Cart"}
        </button>
      ) : (
        <button
          className={styles.removeBtn}
          title="Remove from Cart"
          onClick={handleRemove}
        >
          {productRemovingFromCart ? "Removing" : "Remove From Cart"}
        </button>
      )}
    </div>
  );
};

export default ProductDetails;
