import { Row } from "react-bootstrap";
import { memo, useEffect } from "react";
import ProductCard from "./ProductCard/ProductCard";

const ShopList = ({ productItems }) => {
  useEffect(() => {}, [productItems]);
  if (productItems && productItems.length === 0) {
    return <h1 className="not-found">Không có sản phẩm nào !!</h1>;
  }
  return (
    <Row className="justify-content-center">
      {productItems.map((productItem) => {
        return (
          <ProductCard
            key={productItem.productID}
            title={null}
            productItem={productItem}
          />
        );
      })}
    </Row>
  );
};
export default memo(ShopList);
