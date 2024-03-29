import React, { useState, useEffect, useContext } from "react";
import styles from "./OrdersPage.module.css";
import OrderTable from "../../components/OrderTable/OrderTable";
import Loader from "../../components/UI/Loader/Loader";
import { getDocs, orderBy } from "firebase/firestore";
import { useAuthValue } from "../../context/Auth/AuthState";
import { collection } from "firebase/firestore";
import { db } from "../../config/firebase";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthValue();

  // Fetch user orders from firestore
  const getOrders = async () => {
    const orderSnapshot = await getDocs(
      collection(db, "userOrder", user.uid, "order")
    );
    if (orderSnapshot.empty) {
      return [];
    }
    const orderItems = orderSnapshot.docs.map((orderDoc) => ({
      ...orderDoc.data(),
    }));
    console.log("orderItems", orderItems);
    return orderItems;
  };

  useEffect(() => {
    setLoading(true);
    const fetchOrderData = async () => {
      const orderItems = await getOrders();
      setOrders(orderItems);
    };
    fetchOrderData();
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  // if(write condition when there are no order present and the loader has been set to false)

  if (orders.length === 0)
    return <h1 style={{ textAlign: "center" }}>No Orders Found!</h1>;

  return (
    <div className={styles.ordersContainer}>
      <h1>Your Orders</h1>
      {/* {display the order content using the OrderTable component.} */}
      {orders.map((order, index) => (
        <OrderTable order={order.orders} key={index} />
      ))}
    </div>
  );
};

export default OrdersPage;
