import { useNavigate } from "react-router-dom";
import "./style.css"
import { Button, Card } from "react-bootstrap";

// const LoginRequire1 = ({ setOpenModal }) => {
//     const navigate = useNavigate();

//     const handleRoute = (state) => {
//         navigate("/login", { state: state });
//     }

//     return (
//         <div className="modalBackground">
//             <div className="modalContainer">
//                 <div className="titleCloseBtn">
//                     <button
//                         onClick={() => {
//                             setOpenModal(false);
//                         }}
//                     >
//                         <ion-icon name="close-outline"></ion-icon>
//                     </button>
//                 </div>
//                 <div className="title">
//                     <h2>Cần đăng nhập để mua hàng!</h2>
//                 </div>
//                 <div className="body">
//                     <p>Để việc mua sắm trở nên thuận lợi, hãy click vào nút bên dưới để đăng ký hoặc đăng nhập.</p>
//                 </div>
//                 <div className="footer">
//                     <button
//                         onClick={() => { handleRoute("bounceLeft") }}
//                         id="cancelBtn"
//                     >
//                         Đăng ký
//                     </button>
//                     <button onClick={() => handleRoute("bounceRight")}>Đăng nhập</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

const LoginRequire = () => {
    const navigate = useNavigate();

    const handleRoute = (route, state) => {
        navigate(route, { state: state === "register" ? "bounceLeft" : null });
    }

    return (
        <Card className="unauthorized-container">
            <Card.Body className="unauthorized-body-image text-center">
                <img
                    src="https://cdn-icons-png.flaticon.com/128/13941/13941933.png"
                    alt=""
                    style={{ width: 60, height: 60 }}
                />
            </Card.Body>
            <hr className="w-100 m-0" />
            <Card.Body className="px-4">
                <Card.Title>Xin chào, khách mua hàng!</Card.Title>
                <Card.Text className="pt-2">
                    Chúng tôi nhận thấy rằng bạn chưa thực hiện đăng nhập. Yêu cầu đăng nhập để tiếp tục đặt hàng trực tuyến.
                </Card.Text>
                <Button
                    style={{ borderRadius: "3px" }}
                    className="mb-3 button-effect"
                    onClick={() => handleRoute("/login", "login")}
                >
                    Đăng nhập ngay
                </Button>
                <Card.Text>
                    Nếu chưa có tài khoản, hãy
                    <Card.Link
                        className="text-decoration-none text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRoute("/login", "register")}
                    > Đăng ký.</Card.Link>
                </Card.Text>
                <Card.Subtitle>Lưu ý: </Card.Subtitle>
                <Card.Text>Chúng tôi cũng thực sự khuyên bạn nên bật xác thực hai yếu tố cho tài khoản của mình. Chỉ mất vài phút để cải thiện đáng kể tính bảo mật tài khoản của bạn.</Card.Text>
                <Card.Text>Đội ngũ Inox Thành Nam.</Card.Text>
                <Card.Footer className="text-center px-5 bg-white">
                    <p style={{ fontSize: "12px" }}>Bạn nhận được tin nhắn này để thông báo cho bạn về những thay đổi quan trọng đối với tài khoản của bạn. ©2024 Inox Thành Nam. <br />Đã đăng ký Bản quyền 99 Đường T1,Phường Tây Thạnh , Quận Tân Phú, Thành phố Hồ Chí Minh</p>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default LoginRequire;