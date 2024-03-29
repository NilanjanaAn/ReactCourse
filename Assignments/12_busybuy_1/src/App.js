import React, { useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CartPage from "./pages/CartPage/CartPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProductsContextProvider from "./context/Products/ProductsState";
import { useAuthValue } from "./context/Auth/AuthState";

function App() {
  const { isAuthenticated, user } = useAuthValue();

  const ProtectedRoute = ({ children }) => {
    if (isAuthenticated && user) {
      return children;
    } else {
      return <Navigate to="/signin" replace={true} />;
    }
  };

  // const router = createBrowserRouter([
  //   { path: "/", element: <HomePage /> },
  //   {
  //     path: "/myorders",
  //     element: (
  //       <ProtectedRoute>
  //         <OrdersPage />{" "}
  //       </ProtectedRoute>
  //     ),
  //   },
  //   {
  //     path: "/cart",
  //     element: (
  //       <ProtectedRoute>
  //         <CartPage />{" "}
  //       </ProtectedRoute>
  //     ),
  //   },
  //   { path: "/signin", element: <LoginPage /> },
  //   { path: "/signup", element: <RegisterPage /> },
  //   { path: "*", element: <NotFoundPage /> },
  // ]);

  return (
    <div className="App">
      {/* Define your ContextProvider */}
      <ProductsContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          draggable
          className="toast"
        />

        <header>
          <Navbar />
        </header>
        {/* Define your routes here for 
        "/"     ->   HomePage
        "/signup"   ->   RegisterPage
        "/signin"   ->   LoginPage
        "/cart"     ->   CartPage
        "/myorders" ->   OrdersPage
        "/*"        ->   NotFoundPage
        */}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myorders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        {/* <RouterProvider router={router} /> */}
      </ProductsContextProvider>
    </div>
  );
}

export default App;
