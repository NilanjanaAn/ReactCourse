import React, { useState, useEffect } from "react";
import Loader from "../../components/UI/Loader/Loader";
import styles from "./OrdersPage.module.css";
import OrderTable from "../../components/OrderTable/OrderTable";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/reducers/authReducer";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(authSelector);

  // Fetch user orders from firestore
  const getOrders = async () => {
    if (user) {
      const orderSnapshot = await getDocs(
        collection(db, "userOrder", user.uid, "order")
      );
      if (orderSnapshot.empty) {
        return [];
      }
      const orderItems = orderSnapshot.docs.map((orderDoc) => ({
        ...orderDoc.data(),
      }));
      return orderItems;
    }
    return orders;
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

  useEffect(() => {
    setLoading(true);
    const fetchOrderData = async () => {
      const orderItems = await getOrders();
      setOrders(orderItems);
    };
    fetchOrderData();
    setLoading(false);
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (!loading && !orders.length)
    return <h1 style={{ textAlign: "center" }}>No Orders Found!</h1>;

  return (
    <div className={styles.ordersContainer}>
      <h1>Your Orders</h1>
      {orders.map((order, idx) => {
        return <OrderTable order={order.orders} key={idx} />;
      })}
    </div>
  );
};

export default OrdersPage;
