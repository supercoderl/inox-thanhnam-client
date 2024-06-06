import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import ApiService from "../services/apiService";
import { toast } from "react-toastify";

const Home = ({ add, isDisable }) => {
  const [products, setProducts] = useState([]);

  useWindowScrollToTop();

  const getProducts = async () => {
    await ApiService.get("Product/products").then((res) => {
      if (res.data.success) setProducts(res.data.data);
      else toast.error(res.data.message);
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="On sale tháng 2"
        image={require("../assets/images/icon/sale.gif")}
        bgColor="#f6f9fc"
        productItems={products.length > 0 ? products.filter(x => x.discountID).slice(0, 5) : products}
        add={add}
        isDisable={isDisable}
      />
      <Section
        title="Mới nhất"
        image="https://cdn-icons-gif.flaticon.com/12708/12708326.gif"
        bgColor="white"
        productItems={products.length > 0 ? products.slice(0, 5) : products}
        add={add}
        isDisable={isDisable}
      />
      <Section
        title="Thương hiệu"
        image={require("../assets/images/icon/trademark.gif")}
        bgColor="#f6f9fc"
        productItems={products.length > 0 ? products.slice(0, 5) : products}
        add={add}
        isDisable={isDisable}
      />
    </Fragment>
  );
};

export default Home;
