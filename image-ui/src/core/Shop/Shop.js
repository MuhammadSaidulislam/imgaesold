import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../Card/Card";
import { getCategorys, getFilteredProducts } from "../apiCore";
import { prices } from "../fixedPrice";
import './Shop.css'

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [error, setError] = useState(false);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [limit, setLimit] = useState(12);
  const [result, setResult] = useState([]);

  //load all categories and use it
  useEffect(() => {
    getCategorys().then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setCategories((categories) => data);
      }
    });

    loadFileterResult(skip, limit, myFilters.filters);
  }, []);

  //fetch filtred data
  const loadFileterResult = (newFilters) => {
    //console.log(newFilters)
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  //fetch more data
  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setResult([...result, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  //laod more btn show
  const loadMoreButton = () => {
    console.log(size > 0 && size >= limit);
    return (
      size > 0 &&
      size >= limit && (
        <div className="text-center">
          <button onClick={loadMore} className="btn loadMore mb-5 text-center">
            Load More
          </button>
        </div>

      )
    );
  };

  //set the filters value to state
  const handleFilters = (filters, filterBy) => {
    // console.log('Shop' ,filters, filterBy)
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      let priceValue = handelPrice(filters);
      newFilters.filters[filterBy] = priceValue;
    }
    loadFileterResult(myFilters.filters);
    setMyFilters(newFilters);
  };

  //get the selected price range
  const handelPrice = (value) => {
    const data = prices;
    let arr = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        arr = data[key].array;
      }
    }

    return arr;
  };

  return (
    <Layout
      title="Shop"
      description="E-Commerce Website"
      src="/images/supermarket.png"
      className="container-fluid"
    >
      <Container fluid className="mt-5">
        <Row>
          {/*
        <Col md={3} className="filterCategory">
            <h4>Filter by Categories</h4>
            <ul>
              <Checkbox
                categories={categories}
                handleFilters={(filters) => handleFilters(filters, "category")}
              />
            </ul>
            <h4>Filter by Price</h4>
            <div className="radioBtn">
              <RadioBox
                prices={prices}
                handleFilters={(filters) => handleFilters(filters, "price")}
              />
            </div>
          </Col>
        */}
          <Col md={12} className="mb-3">
            <h2 className="mb-4 text-center" style={{ color: '#ff1f5a', fontWeight: '800' }}>All Images</h2>
          </Col>
          <div className="square-grid-containerr">
            {result.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </div>
         
         <Col md={12}>
         <div className="text-center mt-5 mb-4">
         {loadMoreButton()}
         </div>
         </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Shop;
