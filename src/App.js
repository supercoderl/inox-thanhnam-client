import { lazy, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ScrollUp from "./components/ScrollUp/scrollup";
import axiosInstance from "./config/axios";
import ApiService from "./services/apiService";
import { v4 as uuid } from 'uuid';
import { toast } from "react-toastify";
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const Contact = lazy(() => import("./pages/Contact"));
const OrderResult = lazy(() => import("./pages/OrderResult"));

function App() {
  const [connection, setConnection] = useState();
  const [order, setOrder] = useState(ApiService.getSession("order"));
  const [isDisable, setIsDisable] = useState(false);

  const joinRoom = async (user, room) => {
    const connection = new HubConnectionBuilder().withUrl(`${process.env.REACT_APP_BASE_URL}/notify`).configureLogging(LogLevel.Information).build();
    await connection.start();
    await connection.invoke("JoinRoom", { user, room });
    setConnection(connection);
  }

  const handleAdd = async (productID) => {
    const id = toast.loading("Đang thêm vào giỏ hàng...");
    setIsDisable(true);
    if (order) {
      const body = {
        orderID: order.orderID,
        productID: productID,
        quantity: 1
      };

      await ApiService.post("Order/create-order-item", body, null).then((res) => {
        const result = res.data;
        if (!result) return;
        else if (result.success) {
          toast.update(id, { render: result.message, type: "success", isLoading: false, autoClose: 2000, });
          checkOrder();
        }
        else toast.update(id, { render: result.message, type: "error", isLoading: false, autoClose: 2000, });
      }).catch((error) => console.log(error)).finally(() => setTimeout(() => setIsDisable(false), 300));
    }
    else {
      toast.update(id, { render: "Lỗi hệ thống", type: "error", isLoading: false, autoClose: 2000, });
      setIsDisable(false);
    }
  }

  const getOrderFromSession = () => {
    const orderFromSession = ApiService.getSession("order");
    setOrder(orderFromSession);
  }

  const checkOrder = async () => {
    const sessionID = ApiService.getSession("sessionID");
    const newSessionID = uuid();
    await axiosInstance.get(`Order/get-order-by-user`, {
      params: {
        userID: null,
        sessionID: sessionID || newSessionID
      }
    }).then((response) => {
      const result = response.data;
      if (!result) return;
      else if (result.success && result.data) {
        if (!sessionID) ApiService.setSession("sessionID", newSessionID);
        ApiService.setSession("order", result.data);
      }
    }).catch((error) => console.log("Get order: ", error)).finally(() => {
      getOrderFromSession();
    });
  }

  useEffect(() => {
    joinRoom("Anonymous", "notification");
  }, []);

  useEffect(() => {
    checkOrder();
  }, []);

  return (
    <>
      <NavBar order={order} />
      <Routes>
        <Route path="/" element={<Home add={handleAdd} isDisable={isDisable} />} />
        <Route path="/shop" element={<Shop add={handleAdd} isDisable={isDisable} />} />
        <Route path="/shop/:id" element={<Product add={handleAdd} isDisable={isDisable} />} />
        <Route path="/contact" element={<Contact connection={connection} />} />
        <Route path="/cart" element={<Cart connection={connection} getOrder={checkOrder} />} />
        <Route path="/order/:status" element={<OrderResult />} />
      </Routes>
      <ScrollUp />
      <Footer />
    </>
  );
}

export default App;
