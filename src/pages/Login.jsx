import { useEffect, useState } from "react"
import AuthService from "../services/authService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService from "../services/apiService";
import { v4 as uuid } from 'uuid';
import axiosInstance from "../config/axios";
import Loading from "../components/Loading";
import "./css/Login.css";

function Login() {
    const [state, setState] = useState("bounceRight");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const route = useLocation();

    const [loginRequest, setLoginRequest] = useState({
        username: null,
        password: null
    });

    const [registerRequest, setRegisterRequest] = useState({
        username: null,
        fullname: null,
        phone: null
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
        await AuthService.login(loginRequest.username, loginRequest.password).then(async (res) => {
            if (res.data.success) {
                toast.success(res.data.message);
                AuthService.saveAccessToken(res.data.data?.token?.accessToken);
                AuthService.saveRefreshToken(res.data.data?.refreshToken?.refreshToken);
                AuthService.saveUser(JSON.stringify(res.data.data?.userResult));
                navigate("/");
            }
            else toast.error(res.data.message);
        }).catch((error) => {
            console.log(error);
        }).finally(() => setTimeout(() => setLoading(false), 2000));
    }

    const submitRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        const body = {
            userID: uuid(),
            username: registerRequest.username,
            password: registerRequest.password,
            firstname: ApiService.splitFullname(registerRequest.fullname)?.firstname || "",
            lastname: ApiService.splitFullname(registerRequest.fullname)?.lastname || "",
            phone: typeof registerRequest.phone === "number" ? registerRequest.phone : "0912345678"
        };
        await axiosInstance.post("Auth/register", body).then(async (response) => {
            const result = response.data;
            if (!result) return;
            else if (result.success) {
                toast.success(result.message);
                await submit(e);
            }
            else toast.error(result.message);
        }).catch((error) => console.log("Register: ", error)).finally(() => setTimeout(() => setLoading(false), 2000));
    }

    useEffect(() => {
        if (route && route.state) setState(route.state);
    }, []);

    return (
        <section className="user">
            {
                loading && <Loading />
            }
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3"><span className="text-white">Đăng nhập </span><span className="text-white">Đăng ký</span></h6>
                                {
                                    state === "bounceRight" ?
                                        <button onClick={registerClick}>
                                            <box-icon name='toggle-left' type="solid" color='#ffffff' size="lg"></box-icon>
                                        </button>
                                        :
                                        <button onClick={loginClick}>
                                            <box-icon name='toggle-right' type="solid" color='#ffffff' size="lg"></box-icon>
                                        </button>
                                }
                                <div className={`card-3d-wrap mx-auto ${state}`}>
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3 text-white">Đăng nhập</h4>
                                                    <form action="post" onSubmit={submit}>
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                name="logemail"
                                                                className="form-style"
                                                                placeholder="Tên đăng nhập"
                                                                id="logemail"
                                                                autoComplete="off"
                                                                required
                                                                onChange={(e) => setLoginRequest({ ...loginRequest, username: e.target.value })}
                                                            />
                                                            <box-icon name='user' animation='flashing' color='#ffffff' ></box-icon>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input
                                                                type="password"
                                                                name="logpass"
                                                                className="form-style"
                                                                placeholder="Mật khẩu"
                                                                id="logpass"
                                                                autoComplete="off"
                                                                required
                                                                onChange={(e) => setLoginRequest({ ...loginRequest, password: e.target.value })}
                                                            />
                                                            <box-icon name='lock-alt' animation='flashing' color='#ffffff' ></box-icon>
                                                        </div>
                                                        <input type="submit" className="btn mt-4" value="Đăng nhập" />
                                                    </form>
                                                    <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Quên mật khẩu?</a></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3 text-white">Đăng ký</h4>
                                                    <form action="post" onSubmit={submitRegister}>
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                name="logname"
                                                                className="form-style"
                                                                placeholder="Họ và tên"
                                                                id="logname"
                                                                autoComplete="off"
                                                                required
                                                                onChange={(e) => setRegisterRequest({ ...registerRequest, fullname: e.target.value })}
                                                            />
                                                            <box-icon name='lira' animation='flashing' color='#ffffff' ></box-icon>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input
                                                                type="text"
                                                                name="logemail"
                                                                className="form-style"
                                                                placeholder="Tên đăng nhập"
                                                                id="logemail"
                                                                autoComplete="off"
                                                                required
                                                                onChange={(e) => {
                                                                    setRegisterRequest({ ...registerRequest, username: e.target.value });
                                                                    setLoginRequest({ ...loginRequest, username: e.target.value })
                                                                }}
                                                            />
                                                            <box-icon name='user' animation='flashing' color='#ffffff' ></box-icon>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input
                                                                type="password"
                                                                name="logpass"
                                                                className="form-style"
                                                                placeholder="Mật khẩu"
                                                                id="logpass"
                                                                autoComplete="off"
                                                                required
                                                                onChange={(e) => {
                                                                    setRegisterRequest({ ...registerRequest, password: e.target.value });
                                                                    setLoginRequest({ ...loginRequest, password: e.target.value })
                                                                }}
                                                            />
                                                            <box-icon name='lock-alt' animation='flashing' color='#ffffff' ></box-icon>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input
                                                                type="text"
                                                                name="logphone"
                                                                className="form-style"
                                                                placeholder="Số điện thoại"
                                                                id="logphone"
                                                                autoComplete="off"
                                                                required
                                                                onChange={(e) => setRegisterRequest({ ...registerRequest, phone: e.target.value })}
                                                            />
                                                            <box-icon name='phone' animation='flashing' color='#ffffff' ></box-icon>
                                                        </div>
                                                        <input type="submit" className="btn mt-4" value="Đăng ký" />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login