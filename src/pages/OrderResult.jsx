import Lottie from "lottie-react";
import Congratulation from "../assets/images/animation/congratulation.json";
import Failed from "../assets/images/animation/failed.json";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const OrderResult = () => {
    const { status } = useParams();
    const [result, setResult] = useState({
        title: "",
        animation: null,
        subtitle: "",
        content: ""
    })

    useEffect(() => {
        if (status) {
            if (status === "succeed") {
                setResult({
                    title: "Cảm ơn đã mua hàng của chúng tôi",
                    animation: Congratulation,
                    subtitle: "Đơn hàng của bạn đã được gửi đến cho chúng tôi",
                    content: "Chúng tôi sẽ tiến hành liên hệ với bạn và vận chuyển hàng đến sớm nhất có thể."
                });
            }
            else {
                setResult({
                    title: "Xin lỗi vì đơn hàng bị lỗi",
                    animation: Failed,
                    subtitle: "Đơn hàng của bạn đã gặp vấn đề khi xác nhận",
                    content: "Vui lòng kiểm tra lại đơn hàng và xác nhận lại hoặc có thể liên hệ với chúng tôi."
                });
            }
        }
    }, []);

    return (
        <div className="order-result">
            <div className="container">
                <div className="row">
                    <div className="col-12 ">
                        <div className="message-box">
                            <div className="success-container">
                                <br />
                                <h1 className="monserrat-font" style={{ color: "grey" }}>{result.title}</h1>
                                <br />
                                <div className="d-flex justify-content-center">
                                    <Lottie className="animation" animationData={result.animation} autoPlay loop />
                                </div>
                                <br />
                                <div className="confirm-green-box">
                                    <h5>Xác nhận đơn hàng</h5>
                                    <p>{result.subtitle}</p>
                                    <p>{result.content}</p>
                                </div>
                                <button
                                    id="create-btn"
                                    className="btn-back"
                                    onClick={() => window.location.href = "/"}
                                >
                                    Về trang chủ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderResult;