import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import ApiService from "../services/apiService";
import { toast } from "react-toastify";
import Loader from "../components/Loader/Loader";

const Product = () => {
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const getProductByID = async () => {
    await ApiService.get(`Product/get-product-by-id/${id}`).then((res) => {
      if (res.data.success) setProduct(res.data.data);
      else toast.error(res.data.message);
    }).catch((error) => {
      console.log(error);
    });
  }

  const getProducts = async () => {
    await ApiService.get("Product/products").then((res) => {
      if (res.data.success) setProducts(res.data.data);
      else toast.error(res.data.message);
    }).catch((error) => {
      console.log(error);
    });
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductByID();
    getProducts();
    // setRelatedProducts(
    //   products.filter(
    //     (item) =>
    //       item.category === selectedProduct?.category &&
    //       item.id !== selectedProduct?.id
    //   )
    // );
  }, [id]);

  useWindowScrollToTop();

  if (product) {
    return (
      <Fragment>
        <Banner title={product?.name} />
        <ProductDetails selectedProduct={product} />
        <ProductReviews selectedProduct={product} />
        <section className="related-products">
          <Container>
            <h3>Có thể bạn thích</h3>
          </Container>
          <ShopList productItems={products.length > 0 ? shuffleArray(products).slice(0, 5) : ["asd"]} />
        </section>
      </Fragment>
    );
  }
  else {
    <Loader />
  }
};

export default Product;
