import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useEffect, useState } from "react";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import ApiService from "../services/apiService";
import { toast } from "react-toastify";

const Shop = ({ add, isDisable }) => {
  const [products, setProducts] = useState([]);
  const [filterList, setFilterList] = useState(products);

  useWindowScrollToTop();

  const getProducts = async (categoryID = -1, searchText = "") => {
    await ApiService.get("Product/products", { categoryID, searchText }).then((res) => {
      if (res.data.success) {
        setProducts(res.data.data);
        setFilterList(res.data.data);
      }
      else toast.error(res.data.message);
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Fragment>
      <Banner title="Sản phẩm" />
      <section className="filter-bar">
        <Container className="filter-bar-contianer mb-3">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect handleChange={(e) => getProducts(e.value, "")} />
            </Col>
            <Col md={8}>
              <SearchBar handleChange={(e) => getProducts(-1, e.target.value)} />
            </Col>
          </Row>
        </Container>
        <Container>
          <ShopList
            productItems={filterList}
            add={add}
            isDisable={isDisable}
          />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
