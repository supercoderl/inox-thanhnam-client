import { Col } from "react-bootstrap";
import "./product-card.css";
import ApiService from "../../services/apiService";
import { useEffect, useState } from "react";

const ProductCard = ({ title, productItem, add, isDisable }) => {
  const [image, setImage] = useState("https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg");

  const handelClick = () => {
    window.location.href = `/shop/${productItem.productID}`;
  };

  const getImages = async () => {
    await ApiService.get(`ProductImage/images/${productItem?.productID}`).then((res) => {
      if (res.data.success && res.data.data) setImage(res.data.data[0]?.imageURL);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getImages();
  }, []);

  return (
    <Col md={2} sm={5} xs={10} className="product mtop fade-in">
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
          {
            productItem.quantity === 0 ?
              <span className="out-stock">Hết hàng</span>
              :
              <button
                aria-label="Add"
                type="submit"
                className="add"
                onClick={add}
                disabled={isDisable}
              >
                <ion-icon name="add"></ion-icon>
              </button>
          }
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
