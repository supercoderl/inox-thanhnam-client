import { createContext, lazy, Suspense, useContext, useEffect, useReducer, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ScrollUp from "./components/ScrollUp/scrollup";
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  const [connection, setConnection] = useState();

  const joinRoom = async (user, room) => {
    const connection = new HubConnectionBuilder().withUrl("https://inox.somee.com/notify").configureLogging(LogLevel.Information).build();
    await connection.start();
    await connection.invoke("JoinRoom", { user, room });
    setConnection(connection);
  }

  useEffect(() => {
    joinRoom("Anonymous", "notification");
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<Product />} />
        <Route path="/contact" element={<Contact connection={connection} />} />
        <Route path="/cart" element={<Cart connection={connection} />} />
      </Routes>
      <ScrollUp />
      <Footer />
    </>
  );
}

export default App;
