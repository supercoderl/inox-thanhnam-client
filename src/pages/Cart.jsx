import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ApiService from "../services/apiService";
import { toast } from "react-toastify";
import { useAuth } from "..";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";
import LoginRequire from "../components/Error/loginRequire";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const { state } = useAuth();
  const navigate = useNavigate();
  const user = JSON.parse(AuthService.getUser());
  const [information, setInformation] = useState({
    fullname: user?.fullname || "",
    phone: user?.phone || "",
    address: user?.address || ""
  });

  const getCart = async () => {
    setLoading(true);
    if (!state.isAuthenticated) return;
    else {
      await ApiService.get("Order/get-order-by-user").then(async (res) => {
        if (res.data.success) {
          setOrder(res.data.data);
          getCartItems(res.data.data?.orderID);
        }
        else toast.error(res.data.message);
      }).catch((error) => {
        console.log(error);
      }).finally(() => setLoading(false));
    }
  }

  const getCartItems = async (orderID) => {
    await ApiService.get(`Order/get-order-item/${orderID}`).then((res) => {
      if (res.data.success) {
        if (res.data.data && res.data.data.length > 0) {
          setOrderItems(res.data.data);
          res.data.data.forEach(async (item) => {
            try {
              const productDetail = await getProductByID(item.productID);
              if (!productDetails.some(product => product.productID === productDetail.data.data.productID)) {
                setProductDetails(prevState => [...prevState, productDetail.data.data]);
              }
            } catch (error) {
              console.error("Error fetching product details:", error);
            }
          });
        }
      }
      else toast.warning(res.data.message);
    }).catch((error) => console.log(error));
  }

  const getProductByID = async (productID) => {
    return await ApiService.get(`Product/get-product-by-id/${productID}`);
  }

  const getOrderItem = (productID) => {
    return orderItems.find(x => x.productID === productID);
  }

  const updateQuantity = async (orderItem, product, quantity) => {
    if (quantity <= 0) {
      quantity += 1;
      toast.warning("Bạn không thể giảm số lượng về 0.");
      return;
    }

    orderItem.quantity = quantity;

    await ApiService.put(`Order/update-order-item/${orderItem.orderItemID}`, orderItem, null).then((res) => {
      if (res.data.success) updateTotalAmount(res.data.data?.orderID);
      else toast.error(res.data.message);
    }).catch((error) => console.log(error));
  }

  const updateTotalAmount = async (orderID) => {
    let total = 0;
    orderItems.forEach((orderItem) => {
      total += orderItem.quantity * productDetails.find(x => x.productID === orderItem.productID)?.price;
    });

    const body = {
      orderID: orderID,
      orderDate: new Date(),
      totalAmount: total
    };

    await ApiService.put(`Order/update-order/${orderID}`, body, null).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('', { replace: true });
        getCart();
      }
      else toast.error(res.data.message);
    }).catch((error) => console.log(error));
  }

  const deleteOrderItem = async (orderItem) => {
    await ApiService.delete(`Order/delete-order-item/${orderItem?.orderItemID}`).then((res) => {
      if (res.data.success) {
        setProductDetails(productDetails.filter(x => x.productID !== orderItem?.productID));
        toast.success(res.data.message);
        updateTotalAmount(orderItem?.orderID);
        getCartItems(localStorage.getItem("OrderID"));
      }
      else toast.error(res.data.message);
    }).catch((error) => console.log(error));
  }

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!state.isAuthenticated) {
      toast.warning("Bạn phải đăng nhập để tiếp tục.");
      return;
    }
    console.log(information);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    // if(CartItem.length ===0) {
    //   const storedCart = localStorage.getItem("cartItem");
    //   setCartItem(JSON.parse(storedCart));
    // }
    getCart();
  }, []);

  return (
    <>
      <section className="cart-items">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              {
                !state.isAuthenticated && (
                  <LoginRequire />
                )
              }
              {state.isAuthenticated && productDetails.length === 0 && (
                <h1 className="no-items product">Không có sản phẩm nào trong giỏ hàng</h1>
              )}
              {state.isAuthenticated && productDetails.map((item) => {
                const productQty = item.price * (getOrderItem(item.productID)?.quantity || 0);
                return (
                  <div className="cart-list" key={item.productID}>
                    <Row>
                      <Col className="image-holder" sm={4} md={3}>
                        <img src={item.imgUrl} alt="" />
                      </Col>
                      <Col sm={8} md={9}>
                        <Row className="cart-content justify-content-center">
                          <Col xs={12} sm={9} className="cart-details">
                            <h3>{item.name || "N/A"}</h3>
                            <h4>
                              {ApiService.formatVND(item.price)} * {getOrderItem(item.productID)?.quantity}
                              <span>{ApiService.formatVND(productQty)}</span>
                            </h4>
                          </Col>
                          <Col xs={12} sm={3} className="cartControl">
                            <button
                              className="incCart"
                              onClick={() => updateQuantity(getOrderItem(item.productID), item, getOrderItem(item.productID)?.quantity + 1)}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                            <button
                              className="desCart"
                              onClick={() => updateQuantity(getOrderItem(item.productID), item, getOrderItem(item.productID)?.quantity - 1)}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                          </Col>
                        </Row>
                      </Col>
                      <button
                        className="delete"
                        onClick={() => deleteOrderItem(getOrderItem(item.productID))}
                      >
                        <ion-icon name="close"></ion-icon>
                      </button>
                    </Row>
                  </div>
                );
              })}
            </Col>
            <Col md={4}>
              <div className="cart-total">
                <h2>Tổng tiền đơn hàng</h2>
                <div className=" d_flex">
                  <h4>Thành tiền :</h4>
                  <h3>{ApiService.formatVND(order?.totalAmount)}</h3>
                </div>
              </div>

              <div className="cart-information">
                <h2>Thông tin đặt hàng</h2>
                <form onSubmit={handleCheckout}>
                  <p>
                    <label htmlFor="fullname" className="floatLabel">Họ và tên</label>
                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      value={information?.fullname}
                      onChange={(e) => setInformation({ ...information, fullname: e.target.value })}
                    />
                  </p>
                  <p>
                    <label htmlFor="phone" className="floatLabel">Số điện thoại</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={information?.phone}
                      onChange={(e) => setInformation({ ...information, phone: e.target.value })}
                    />
                  </p>
                  <p>
                    <label htmlFor="address" className="floatLabel">Địa chỉ</label>
                    <textarea
                      id="address"
                      name="address"
                      rows={4}
                      className="w-100"
                      value={information?.address}
                      onChange={(e) => setInformation({ ...information, address: e.target.value })}
                    />
                  </p>
                  <p>
                    <input type="submit" value="Tiến hành đặt hàng" id="submit" />
                  </p>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Cart;
