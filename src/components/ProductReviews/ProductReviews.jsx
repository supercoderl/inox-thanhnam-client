import { useEffect, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import "./product-review.css";
import ApiService from "../../services/apiService";
import like from "../../assets/images/svg/like";
import unlike from "../../assets/images/svg/unlike";
import remove from "../../assets/images/svg/delete";
import Loading from "../Loading/Loading";
import moment from "moment";
import { getColorByAlphabet, getFirstLetter } from "../../utils/text";

const ProductReviews = ({ selectedProduct }) => {
  const sessionID = ApiService.getSession("sessionID");
  const [listSelected, setListSelected] = useState("desc");
  const [name, setName] = useState(ApiService.getSession("reviewer") || "");
  const [hoveredStar, setHoveredStar] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  }

  const handleSubmit = async (rating) => {
    setLoading(true);
    const body = {
      productID: selectedProduct?.productID,
      reviewerName: name,
      reviewContent: content,
      rating,
      sessionID: sessionID,
    }

    await ApiService.post("ProductReview/create-review", body).then((res) => {
      const result = res.data;
      if (!result) return;
      else if (result.success) {
        getReviews();
        ApiService.setSession("reviewer", name);
      }
    }).catch((error) => console.log(error)).finally(() => setTimeout(() => {
      setLoading(false);
      setShowModal(false);
      setSelectedRating(0);
      setContent("");
    }, 300));
  }

  const getReviews = async () => {
    await ApiService.get(`ProductReview/reviews/${selectedProduct?.productID}`).then((res) => {
      const result = res.data;
      if (!result) return;
      else if (result.success && result.data) {
        console.log(result.data);
        setReviews(result.data);
      }
    }).catch((error) => console.log(error));
  }

  const handleStarHover = (index) => {
    setHoveredStar(index);
  };

  const handleMouseLeave = () => {
    setHoveredStar(null);
  };

  const handleRate = (value) => {
    setSelectedRating(value);
    handleSubmit(value);
  }

  const handleDeleteReview = async (reviewID) => {
    await ApiService.delete(`ProductReview/delete-review/${reviewID}`).then((res) => {
      const result = res.data;
      if (!result) return;
      else if (result.success) getReviews();
    })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <section className="product-reviews">
      <Container>
        <ul>
          <li
            style={{ color: listSelected === "desc" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("desc")}
          >
            Mô tả
          </li>
          <li
            style={{ color: listSelected === "rev" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("rev")}
          >
            Đánh giá ({reviews?.length || 0})
          </li>
        </ul>
        {listSelected === "desc" ? (
          <p>{selectedProduct?.description}</p>
        ) :
          <div className="rates">
            <div className="app container">
              <div className="col-md-10 col-lg-7">
                {
                  reviews && reviews.length > 0 ?
                    <div className="pt-1 mb-5">
                      <div className="mb-5 hstack gap-3 align-items-center">
                        <div className="fs-5">{reviews.length} Bài đánh giá</div>
                      </div>

                      <div className="vstack gap-4">
                        <div className="comment-box">
                          <div className="d-flex comment">
                            <img className="rounded-circle comment-img" src={`https://via.placeholder.com/128/${getColorByAlphabet(getFirstLetter(name))}/ffffff.png?text=${getFirstLetter(name)}`} width="128" height="128" />
                            <div className="flex-grow-1 ms-3">
                              <div className="d-flex gap-3 input-container">
                                <div className="form-floating comment-compose mb-2 flex-grow-0.5">
                                  <textarea
                                    className="form-control"
                                    placeholder="Tên của bạn"
                                    id="my-comment-reply"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                  ></textarea>
                                  <label htmlFor="my-comment-reply">Tên của bạn</label>
                                </div>
                                <div className="form-floating comment-compose mb-2 flex-grow-1">
                                  <textarea
                                    className="form-control"
                                    placeholder="Nội dung đánh giá"
                                    id="my-comment-reply"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                  ></textarea>
                                  <label htmlFor="my-comment-reply">Nội dung đánh giá</label>
                                </div>
                              </div>
                              <div className="hstack justify-content-end gap-1">
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() => setShowModal(true)}
                                >
                                  Đánh giá
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {
                          reviews.map((review, index) => {
                            return (
                              <div className="comment-box" key={index}>
                                <div className="d-flex comment">
                                  <img
                                    className="rounded-circle comment-img"
                                    src={`https://via.placeholder.com/128/${getColorByAlphabet(getFirstLetter(review.reviewerName))}/ffffff.png?text=${getFirstLetter(review.reviewerName)}`}
                                    width="128"
                                    height="128"
                                  />
                                  <div className="flex-grow-1 ms-3">
                                    <div className="mb-1">
                                      <a href="#" className="fw-bold link-body-emphasis pe-1">{review.reviewerName}</a>
                                      <span className="text-body-secondary text-nowrap"> {moment(review.reviewDate).fromNow()}</span>
                                    </div>
                                    <div className="mb-2">{review.reviewContent}</div>
                                    <div className="hstack align-items-center">
                                      <button className="icon-btn me-1" href="#">
                                        {like}
                                      </button>
                                      <span className="me-3 small">{review.likes}</span>
                                      <button className="icon-btn me-1" href="#">
                                        {unlike}
                                      </button>
                                      <span className="me-3 small">{review.unlikes}</span>
                                      {
                                        sessionID === review.sessionID &&
                                        <button
                                          className="icon-btn ms-auto"
                                          onClick={() => handleDeleteReview(review.reviewID)}
                                        >
                                          {remove}
                                        </button>
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                    :
                    <p>Chưa có bài đánh giá nào</p>
                }
              </div>
            </div>
          </div>
        }
      </Container>

      <Modal
        show={showModal}
        onHide={handleClose}
        centered
      >

        <header className='header text-center'>
          <h2>Chấm điểm</h2>
          <p>Bạn sẽ cho sản phẩm <b>{selectedProduct?.name}</b> bao nhiêu điểm?</p>
        </header>

        <div className='rating-widget'>
          <div className='rating-stars text-center'>
            <ul id='stars'>
              {
                [1, 2, 3, 4, 5].map((index) => {
                  return (
                    <li
                      className={`star ${hoveredStar >= index && 'hover'} ${selectedRating >= index && 'selected'}`}
                      key={index}
                      onMouseEnter={() => handleStarHover(index)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleRate(index)}
                    >
                      <i className='fa fa-star fa-fw'></i>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>

        {loading && <Loading />}
      </Modal>
    </section>
  );
};

export default ProductReviews;
