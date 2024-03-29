import { Button } from "react-bootstrap";
import "../assets/css/contact.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthService from "../services/authService";
import ApiService from "../services/apiService";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner/Spinner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";

const Contact = ({ connection }) => {
    const user = JSON.parse(AuthService.getUser());
    const [information, setInformation] = useState({
        fullname: user?.fullname || "",
        phone: user?.phone || "",
        email: "",
        notes: ""
    });
    const [loading, setLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        setLoading(true);
        const body = {
            fullname: information.fullname || "",
            phone: information.phone,
            email: information.email || "",
            notes: information.notes || "",
            status: "new"
        }

        await ApiService.post("Contact/create-contact", body, null).then(async (response) => {
            const result = response.data;
            if(!result) return;
            if (result.success && result.data) {
                toast.success(result.message);
                await connection.invoke("SendNotify", `Bạn có tin nhắn mới từ ${result.data?.fullname}`, "contact", result.data?.contactID);
                setTimeout(() => {
                    window.location.reload();
                }, 1200);
            }
            else toast.error(result.message);
        }).catch((error) => console.log(error)).finally(() => { 
            setLoading(false);
        });
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useWindowScrollToTop();

    return (
        <div className="contact3 py-5">
            <div className="row no-gutters">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card-shadow">
                                <img src="https://has.edu.vn/wp-content/uploads/2021/07/faq.jpg" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-box ml-3 px-3">
                                <h1 className="font-weight-light mt-2">Liên hệ với chúng tôi</h1>
                                <form className="mt-4" onSubmit={handleSend}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group mt-2">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Họ và tên"
                                                    required
                                                    value={information.fullname}
                                                    onChange={(e) => setInformation({ ...information, fullname: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group mt-2">
                                                <input
                                                    className="form-control"
                                                    type="email"
                                                    placeholder="Địa chỉ email"
                                                    value={information.email}
                                                    onChange={(e) => setInformation({ ...information, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group mt-2">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Số điện thoại"
                                                    required
                                                    value={information.phone}
                                                    onChange={(e) => setInformation({ ...information, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group mt-2">
                                                <textarea
                                                    className="form-control"
                                                    rows={5}
                                                    placeholder="Tin nhắn"
                                                    required
                                                    value={information.notes}
                                                    onChange={(e) => setInformation({ ...information, notes: e.target.value })}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <button type="submit" className="btn btn-danger-gradiant mt-3 text-white border-0 px-3 py-2">
                                                <div className="d-flex align-items-center">
                                                    {
                                                        loading ? <Spinner size="0.75em" color="white" /> : null
                                                    }
                                                    <span> SUBMIT</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="card mt-4 border-0 mb-4">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4">
                                        <div className="card-body d-flex align-items-center justify-content-center c-detail pl-0">
                                            <div className="mr-3 align-self-center">
                                                <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon1.png" />
                                            </div>
                                            <div className="ms-3">
                                                <h6 className="font-weight-medium">Địa chỉ</h6>
                                                <p className="">99 Đường T1,Phường Tây Thạnh ,
                                                    <br />Quận Tân Phú, Thành phố Hồ Chí Minh</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="card-body d-flex align-items-center justify-content-center c-detail">
                                            <div className="mr-3 align-self-center">
                                                <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon2.png" />
                                            </div>
                                            <div className="ms-3">
                                                <h6 className="font-weight-medium">Điện thoại - Nhấn để gọi</h6>
                                                <p className="d-flex" style={{ gap: "5px" }}>
                                                    <Link
                                                        to="tel:0776747680"
                                                        className="py-1 tel tel1"
                                                    >
                                                        0776747680
                                                    </Link>
                                                    <br />
                                                    <Link
                                                        to="tel:0909239816"
                                                        className="py-1 tel tel2"
                                                    >
                                                        0909239816
                                                    </Link>
                                                    <br />
                                                    <Link
                                                        to="tel:0902273698"
                                                        className="py-1 tel tel3"
                                                    >
                                                        0902273698
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="card-body d-flex align-items-center justify-content-center c-detail">
                                            <div className="mr-3 align-self-center">
                                                <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon3.png" />
                                            </div>
                                            <div className="ms-3">
                                                <h6 className="font-weight-medium">Email</h6>
                                                <p className="">
                                                    namsipo.2001@gmail.com
                                                </p>
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
    )
}

export default Contact