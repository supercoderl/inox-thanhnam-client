import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./product-details.css";
import ApiService from "../../services/apiService";
import axiosInstance from "../../config/axios";
import Loader from "../Loader/Loader";

const ProductDetails = ({ selectedProduct, add, isDisable, magnifierHeight = 100, magnifieWidth = 100, zoomLevel = 1.5 }) => {
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);

  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  const [images, setImages] = useState([]);
  const [image, setImage] = useState("https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg");
  const [loading, setLoading] = useState(true);

  const getProductImages = async () => {
    await axiosInstance.get(`ProductImage/images/${selectedProduct?.productID}`).then((res) => {
      if (res.data.success && res.data.data) {
        setImages(res.data?.data);
        setImage(res.data?.data[0]?.imageURL);
      }
    }).catch((error) => {
      console.log(error);
    }).finally(() => setTimeout(() => setLoading(false), 300));
  }

  const handleChangeImage = (image) => {
    setImage(image?.imageURL);
  }

  const slide = (shift) => {
    scrl.current.scrollBy({
      left: shift,
      behavior: 'smooth',
    });

    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);
    if (Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <= scrl.current.offsetWidth) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <= scrl.current.offsetWidth) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };

  useEffect(() => {
    getProductImages();
  }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={4}>
            <div className="main-image-container position-relative">
              <img
                loading="lazy"
                className="main-image"
                src={image}
                alt=""
                onMouseEnter={(e) => {
                  // update image size and turn-on magnifier
                  const elem = e.currentTarget;
                  const { width, height } = elem.getBoundingClientRect();
                  setSize([width, height]);
                  setShowMagnifier(true);
                }}
                onMouseMove={(e) => {
                  // update cursor position
                  const elem = e.currentTarget;
                  const { top, left } = elem.getBoundingClientRect();

                  // calculate cursor position on the image
                  const x = e.pageX - left - window.pageXOffset;
                  const y = e.pageY - top - window.pageYOffset;
                  setXY([x, y]);
                }}
                onMouseLeave={() => {
                  // close magnifier
                  setShowMagnifier(false);
                }}
              />
              <div
                style={{
                  display: showMagnifier ? "" : "none",
                  position: "absolute",

                  // prevent magnifier blocks the mousemove event of img
                  pointerEvents: "none",
                  // set size of magnifier
                  height: `${magnifierHeight}px`,
                  width: `${magnifieWidth}px`,
                  // move element center to cursor pos
                  top: `${y - magnifierHeight / 2}px`,
                  left: `${x - magnifieWidth / 2}px`,
                  opacity: "1", // reduce opacity so you can verify position
                  border: "1px solid lightgray",
                  backgroundColor: "white",
                  backgroundImage: `url('${image}')`,
                  backgroundRepeat: "no-repeat",

                  //calculate zoomed image size
                  backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel
                    }px`,

                  //calculate position of zoomed image.
                  backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                  backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                }}
              ></div>
            </div>
          </Col>
          <Col md={7} className="d-flex flex-column jutify-content-between">
            <h2>{selectedProduct?.name}</h2>
            <div className="rate">
              <div className="stars">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <span>
                {selectedProduct?.avgRating} 384 lượt đánh giá
              </span>
            </div>
            <div className="info">
              <span className="price">Giá tiền: {ApiService.formatVND(selectedProduct?.price)}</span>
            </div>
            <div className="detail py-3">
              <div className="d-flex align-items-center">
                <ion-icon name="copy" color="secondary"></ion-icon>&nbsp;Chất liệu:
                <span>&nbsp;{selectedProduct?.material}</span>
              </div>

              <div className="d-flex align-items-center">
                <ion-icon name="earth" color="secondary"></ion-icon>&nbsp;Xuất xứ:
                <span>&nbsp;{selectedProduct?.origin}</span>
              </div>

              <div className="d-flex align-items-center">
                <ion-icon name="expand" color="secondary"></ion-icon>&nbsp;Kích thước:
                <span>&nbsp;{selectedProduct?.dimension}</span>
              </div>

              <div className="d-flex align-items-center">
                <ion-icon name="sync" color="secondary"></ion-icon>&nbsp;Tồn kho:
                <span>&nbsp;{selectedProduct?.quantity} sản phẩm</span>
              </div>

            </div>
            <div className="discount-info">
              <span className="title">Giảm giá lên tới 20% mỗi ngày</span>
              <span className="text">Nhập code: <b style={{ color: "rgb(131 212 46)" }}>PROMO1234</b></span>
            </div>
            <button
              className="addToCartBtn"
              type="submit"
              onClick={add}
              disabled={isDisable || selectedProduct?.quantity === 0}
            >
              <span>{selectedProduct?.quantity === 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}</span>
            </button>
          </Col>
        </Row>
        <Row className="mt-3 justify-content-center">
          <Col md={4}>
            <div className="d-flex images-container">
              {
                images && images.length > 0 &&
                <>
                  <button className="slider-previous" onClick={() => slide(-100)}>
                    <svg
                      fill="#000000"
                      width="20px"
                      height="20px"
                      viewBox="-78.5 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>{"left"}</title>
                      <path d="M257 64L291 98 128 262 291 426 257 460 61 262 257 64Z" />
                    </svg>
                  </button>
                  <div className="d-flex images-col" ref={scrl} onScroll={scrollCheck}>
                    {
                      images.map((item, index) => (
                        <img
                          key={index}
                          loading="lazy"
                          className="image-item"
                          src={item?.imageURL}
                          alt=""
                          onClick={() => handleChangeImage(item)}
                        />
                      ))
                    }
                  </div>
                  <button className="slider-next" onClick={() => slide(+100)}>
                    <svg
                      fill="#000000"
                      width="20px"
                      height="20px"
                      viewBox="-77 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>{"right"}</title>
                      <path d="M98 460L64 426 227 262 64 98 98 64 294 262 98 460Z" />
                    </svg>
                  </button>
                </>
              }
            </div>
          </Col>
          <Col md={7}></Col>
        </Row>
      </Container>
    </section >
  );
};

export default ProductDetails;
