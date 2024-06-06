import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";
import { Link } from "react-router-dom";

const Section = ({ title, bgColor, productItems, image, add, isDisable }) => {
  return (
    <section style={{ background: bgColor }}>
      <Container fluid>
        <div className="heading d-flex">
          {
            image ?
              <img src={image} width={60} height={60} alt="Sale"/>
              :
              null
          }
          <h2>{title}</h2>
          <Link className="link" to={"shop"}>Xem thêm</Link>
        </div>
        <Row className="justify-content-center">
          {productItems.map((productItem) => {
            return (
              <ProductCard
                key={productItem.productID}
                title={title}
                productItem={productItem}
                add={() => add(productItem.productID)}
                isDisable={isDisable}
              />
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Section;
