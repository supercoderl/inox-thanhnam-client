import React from "react"
import "./style.css"
import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="footer-row">
          <Col md={3} sm={5} className='box'>
            <div className="logo">
              <img
                src="https://cdn-icons-png.flaticon.com/128/13941/13941933.png"
                alt=""
                width={40} height={40}
              />
              <h1>Inox Thành Nam</h1>
            </div>
            <p>Chuyên cung cấp các sản phẩm đồ cũ, inox từ bàn ghế salon đến các loại tủ thông dụng. Hãy đến với chúng tôi để mang lại một trải nghiệm về nội thất cho căn nhà của bạn.</p>
          </Col>
          <Col md={3} sm={5} className='box'>
            <div className="d-flex align-items-strength">
              <img src="https://cdn-icons-png.flaticon.com/128/6186/6186048.png" width={30} height={30} alt="" />
              <h2 className="ms-2">Về chúng tôi</h2>
            </div>

            <ul>
              <li><Link to="/">Nghề nghiệp</Link></li>
              <li><Link to="/shop">Sản phẩm</Link></li>
              <li><Link to="/">Điều khoản</Link></li>
              <li><Link to="http://localhost:3001/admin/login">Đăng nhập admin</Link></li>
            </ul>
          </Col>
          <Col md={3} sm={5} className='box'>
            <div className="d-flex align-items-strength">
              <img src="https://cdn-icons-png.flaticon.com/128/3696/3696635.png" width={30} height={30} alt="" />
              <h2 className="ms-2">Khách hàng</h2>
            </div>
            <ul>
              <li><Link to="/login">Đăng nhập</Link></li>
              <li><Link to="/cart" >Theo dõi giỏ hàng</Link></li>
            </ul>
          </Col>
          <Col md={3} sm={5} className='box'>
            <div className="d-flex align-items-strength">
              <img src="https://cdn-icons-png.flaticon.com/128/10215/10215258.png" width={30} height={30} alt="" />
              <h2 className="ms-2">Liên hệ</h2>
            </div>
            <ul>
              <li>99 Đường T1,Phường Tây Thạnh , Quận Tân Phú, Thành phố Hồ Chí Minh</li>
              <li>Email: namsipo.2001@gmail.com</li>
              <li>Điện thoại: 0776747680 - 0909239816 - 0902273698</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
