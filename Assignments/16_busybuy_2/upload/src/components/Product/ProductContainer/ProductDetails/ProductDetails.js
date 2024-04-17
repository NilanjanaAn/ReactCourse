import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import { useNavigate } from "react-router-dom";
import MinusIcon from "../../../UI/Icons/MinusIcon";
import PlusIcon from "../../../UI/Icons/PlusIcon";
import { useSelector, useDispatch } from "react-redux";
import { authSelector } from "../../../../redux/reducers/authReducer";
import {
  getDocs,
  query,
  collection,
  where,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../../config/firebase";
import { getCart } from "../../../../redux/reducers/cartReducer";

const ProductDetails = ({ title, price, productId, onCart, quantity }) => {
  const [productAddingToCart, setProductAddingToCart] = useState(false);
  const [productRemovingFromCart, setProductRemovingCart] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector(authSelector);
  const isAuthenticated = user;
  const dispatch = useDispatch();

  const addProductToCart = async (e) => {
    // Function to add product to cart
    e.preventDefault();

    if (isAuthenticated && user) {
      setProductAddingToCart(true);
      const querySnapshot = await getDocs(
        query(
          collection(db, "userCart", user.uid, "cart"),
          where("id", "==", productId)
        )
      );
      if (querySnapshot.empty) {
        await addDoc(collection(db, "userCart", user.uid, "cart"), {
          id: productId,
          qty: 1,
        });
      } else {
        const productDoc = querySnapshot.docs[0];
        let qty = productDoc.data().qty;
        qty = qty + 1;
        const docRef = doc(
          collection(db, "userCart", user.uid, "cart"),
          productDoc.id
        );
        await updateDoc(docRef, {
          qty,
        });
      }
      toast.success("Product added successfully!");
      setProductAddingToCart(false);
    } else navigate("/signin");
  };

  const removeProduct = async (e) => {
    // Function to remaove the cart
    e.preventDefault();
    try {
      setProductRemovingCart(true);
      const querySnapshot = await getDocs(
        query(
          collection(db, "userCart", user.uid, "cart"),
          where("id", "==", productId)
        )
      );

      if (!querySnapshot.empty) {
        const productDoc = querySnapshot.docs[0];
        await deleteDoc(
          doc(collection(db, "userCart", user.uid, "cart"), productDoc.id)
        );
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setProductRemovingCart(false);
    }
  };

  const handleAdd = async (e) => {
    // Function for Handling the product quantity increase
    const querySnapshot = await getDocs(
      query(
        collection(db, "userCart", user.uid, "cart"),
        where("id", "==", productId)
      )
    );
    const productDoc = querySnapshot.docs[0];
    let qty = productDoc.data().qty;
    qty = qty + 1;
    const docRef = doc(
      collection(db, "userCart", user.uid, "cart"),
      productDoc.id
    );
    await updateDoc(docRef, {
      qty,
    });
  };

  const handleRemove = async (e) => {
    // Handling the product quantity decrease
    const querySnapshot = await getDocs(
      query(
        collection(db, "userCart", user.uid, "cart"),
        where("id", "==", productId)
      )
    );
    const productDoc = querySnapshot.docs[0];
    let qty = productDoc.data().qty;
    qty = qty - 1;
    if (qty === 0) {
      await deleteDoc(
        doc(collection(db, "userCart", user.uid, "cart"), productDoc.id)
      );
    } else {
      const docRef = doc(
        collection(db, "userCart", user.uid, "cart"),
        productDoc.id
      );
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
            <MinusIcon handleRemove={handleRemove} />
            {quantity}
            <PlusIcon handleAdd={handleAdd} />
          </div>
        )}
      </div>
      {/* Conditionally Rendering buttons based on the screen */}
      {!onCart ? (
        <button
          className={styles.addBtn}
          title="Add to Cart"
          disabled={productAddingToCart}
          onClick={addProductToCart}
        >
          {productAddingToCart ? "Adding" : "Add To Cart"}
        </button>
      ) : (
        <button
          className={styles.removeBtn}
          title="Remove from Cart"
          onClick={removeProduct}
        >
          {productRemovingFromCart ? "Removing" : "Remove From Cart"}
        </button>
      )}
    </div>
  );
};

export default ProductDetails;
