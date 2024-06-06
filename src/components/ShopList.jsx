import { Row } from "react-bootstrap";
import { memo, useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";

const ShopList = ({ productItems, add, isDisable }) => {
  const [items, setItems] = useState([]);

  const shuffleArray = (array) => {
    const shuffledItems = array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setItems(shuffledItems);
  };

  useEffect(() => {
    if (productItems) {
      shuffleArray(productItems);
    }
  }, [productItems]);

  if (items && items.length === 0) {
    return <h1 className="not-found">Không có sản phẩm nào !!</h1>;
  }

  return (
    <Row className="justify-content-center">
      {items.map((productItem) => {
        return (
          <ProductCard
            key={productItem.productID}
            title={null}
            productItem={productItem}
            add={() => add(productItem.productID)}
            isDisable={isDisable}
          />
        );
      })}
    </Row>
  );
};
export default memo(ShopList);
