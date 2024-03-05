import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiService from "../../services/apiService";
import { useEffect, useState } from "react";
import { useAuth } from "../..";

const ProductCard = ({ title, productItem }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const orderID = localStorage.getItem("OrderID");
  const { state } = useAuth();

  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${productItem.productID}`);
    window.location.reload();
  };

  const handelAdd = async () => {
    if (!state.isAuthenticated) {
      toast.warning("Bạn phải đăng nhập để tiếp tục.");
      return;
    }
    setLoading(true);
    const body = {
      orderID,
      productID: productItem.productID,
      quantity: 1
    };

    await ApiService.post("Order/create-order-item", body, null).then((res) => {
      if (res.data.success) toast.success(res.data.message);
      else toast.error(res.data.message);
    }).catch((error) => console.log(error)).finally(() => setLoading(false));
  };

  const getImages = async () => {
    await ApiService.get(`ProductImage/images/${productItem?.productID}`).then((res) => {
      console.log(res);
      if (res.data.success) setImage(res.data.data[0]?.imageURL);
      else toast.error(res.data.message);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getImages();
  }, []);

  return (
    <Col md={2} sm={5} xs={10} className="product mtop">
      {title === "On sale tháng 2" ? (
        <span className="discount">{productItem.discount}% Off</span>
      ) : null}
      <img
        loading="lazy"
        onClick={() => handelClick()}
        src={image}
        alt=""
      />
      <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div>
      <div className="product-details">
        <h3 onClick={() => handelClick()}>{productItem.name}</h3>
        <div className="rate">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
        <div className="price">
          <h5>{ApiService.formatVND(productItem.price)}</h5>
          <button
            aria-label="Add"
            type="submit"
            className="add"
            onClick={() => handelAdd()}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
