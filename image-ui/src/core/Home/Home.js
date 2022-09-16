import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { getProducts } from "../apiCore";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../Card/Card";
import Search from "../Search/Search";
import ImageGallery from "../ImageGallery/ImageGallery";

const Home = () => {
  //state
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  //get the products by sell
  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  //get the products by arrival
  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  //return the layout
  return (
    <Layout
      title="Welcome to Click to Cart"
      description="Click to Cart is a stock photography Website, From Where you can buy any daily life images for your-self."
      src="/images/shopping-basket.png"
      className="container-fluid"
    >
   
    <Container>
        <Row>
          <Col md={12}>
            <Search />
          </Col>
        </Row>
      </Container>
  
      {/*
    <Container>
        <Row>
          <Col md={12}>
            <ImageGallery />
          </Col>
        </Row>
      </Container>
    */}

     <Container>
           <h2 className="mb-4">Latest Arrivals</h2> 
     <div className="square-grid-container">
  
         {productsBySell.slice(0, 5).map((product, i) => (
             <Card key={i} product={product} />
         ))}
     </div>
     </Container>

      <hr />
      <Container>
        <h2 className="mb-4">All Images</h2>
        <div className="square-grid-containerr">
        {productsByArrival.slice(0, 12).map((product, i) => (
          <Card key={i} product={product} />
      ))}
        </div>
         

      </Container>
    </Layout>
  );
};

export default Home;
