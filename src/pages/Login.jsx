import { useEffect, useState } from "react"
import AuthService from "../services/authService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import ApiService from "../services/apiService";
import { useAuth } from "..";

function Login() {
    const [state, setState] = useState("bounceRight");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const route = useLocation();
    const { login } = useAuth();

    const [loginRequest, setLoginRequest] = useState({
        username: null,
        password: null
    });

    const registerClick = () => {
        setState("bounceLeft");
    }

    const loginClick = () => {
        setState("bounceRight");
    }

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await AuthService.login(loginRequest.username, loginRequest.password).then((res) => {
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
                AuthService.saveAccessToken(res.data.data?.token?.accessToken);
                AuthService.saveRefreshToken(res.data.data?.refreshToken?.refreshToken);
                AuthService.saveUser(JSON.stringify(res.data.data?.userResult));
                login(JSON.stringify(res.data.data?.userResult));
                localStorage.setItem("authState", JSON.stringify({ isAuthenticated: true, payload: JSON.stringify(res.data.data?.userResult)}));
                getCart();
                navigate("/");
            }
            else toast.error(res.data.message);
        }).catch((error) => {
            console.log(error);
        }).finally(() => setLoading(false));
    }

    const getCart = async () => {
        await ApiService.get("Order/get-order-by-user").then(async (res) => {
            console.log(res);
            if (!res.data.success) {
                const body = {
                    orderDate: new Date(),
                    totalAmount: 0,
                }
                const result = await ApiService.post("Order/create-order", body, null);
                localStorage.setItem("OrderID", result.data.data?.orderID);
                toast.success(result.data.message);
            }
            else {
                localStorage.setItem("OrderID", res.data.data?.orderID);
            }
        }).catch((error) => console.log(error));
    }

    useEffect(() => {
        console.log(route);
        if (route && route.state) setState(route.state);
    }, []);

    return (
        <section className="user">
            <div className="user_options-container">
                <div className="user_options-text">
                    <div className="user_options-unregistered">
                        <h2 className="user_unregistered-title">Chưa có tài khoản?</h2>
                        <p className="user_unregistered-text">Tạo ngay tài khoản mới để mua hàng inox của chúng tôi.</p>
                        <button className="user_unregistered-signup" id="signup-button" onClick={registerClick}>Đăng ký</button>
                    </div>

                    <div className="user_options-registered">
                        <h2 className="user_registered-title">Bạn đã có tài khoản?</h2>
                        <p className="user_registered-text">Tham gia ngay để nhận thêm các ưu đãi mới nhất.</p>
                        <button className="user_registered-login" id="login-button" onClick={loginClick}>Đăng nhập</button>
                    </div>
                </div>

                <div className={`user_options-forms ${state}`} id="user_options-forms">
                    <div className="user_forms-login">
                        <h2 className="forms_title">Đăng nhập</h2>
                        <form className="forms_form" onSubmit={submit}>
                            <fieldset className="forms_fieldset">
                                <div className="forms_field">
                                    <input
                                        type="text"
                                        placeholder="Tên đăng nhập"
                                        className="forms_field-input"
                                        required
                                        autoFocus
                                        onChange={(e) => setLoginRequest({ ...loginRequest, username: e.target.value })}
                                    />
                                </div>
                                <div className="forms_field">
                                    <input
                                        type="password"
                                        placeholder="Mật khẩu"
                                        className="forms_field-input"
                                        required
                                        onChange={(e) => setLoginRequest({ ...loginRequest, password: e.target.value })}
                                    />
                                </div>
                                {
                                    loading ?
                                        <div><Spinner /> Đang đăng nhập...</div>
                                        :
                                        null
                                }
                            </fieldset>
                            <div className="forms_buttons">
                                <button type="button" className="forms_buttons-forgot">Quên mật khẩu?</button>
                                <input type="submit" value="Đăng nhập" className="forms_buttons-action" />
                            </div>
                        </form>
                    </div>
                    <div className="user_forms-signup">
                        <h2 className="forms_title">Đăng ký</h2>
                        <form className="forms_form">
                            <fieldset className="forms_fieldset">
                                <div className="forms_field">
                                    <input type="text" placeholder="Họ và tên" className="forms_field-input" required />
                                </div>
                                <div className="forms_field">
                                    <input type="text" placeholder="Tên đăng nhập" className="forms_field-input" required />
                                </div>
                                <div className="forms_field">
                                    <input type="password" placeholder="Mật khẩu" className="forms_field-input" required />
                                </div>
                            </fieldset>
                            <div className="forms_buttons">
                                <input type="submit" value="Đăng ký" className="forms_buttons-action" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login