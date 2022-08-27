import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { useForm } from "react-hook-form";
import { getSingleProdcut, getRelatedProduct, postBids } from "../apiCore";
import { isAuthenticate } from "../../auth/index";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../Card/Card";
import ShowImage from "../ShowImage/ShowImage";
import { Redirect } from "react-router-dom";
import './Product.css';
import { addItem, updateItem, removeItem } from "../cartHelpers";

const Product = (props) => {
  //state
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
  const [price, setPrice] = useState(0);
  let [redirect, setRedirect] = useState(false);

  //get user data and token
  const { user, token } = isAuthenticate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //load product data
  const loadSingleProduct = (prodcutId) => {
    getSingleProdcut(prodcutId).then((data) => {
      if (data.error) {
        console.log(data);
        setError(data.error);
      } else {
        setProduct(data);
        console.log(data);
        getRelatedProduct(data._id).then((related) => {
          if (related.error) {
            console.log("here");
            setError(related.error);
          } else {
            setRelatedProduct(related);
          }
        });
      }
    });
  };

  //on load
  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  //form submit
  const onSubmit = (data) => {
    const productId = props.match.params.productId;
    console.log(productId);
    if (isAuthenticate()) {
      postBids(data, productId, user, token).then((d) => {
        if (d.error) {
          throw error;
        } else {
          loadSingleProduct(productId);
          setValue("bidprice", "", { shouldValidate: false });
        }
      });
    } else {
      setRedirect(true);
    }
  };

  //show redirect msg
  const redirectUser = () => {
    if (redirect) {
      return <Redirect to="/signin" />;
    }
  };

  //returun the layout
  const [showStatus, setShow] = useState()
  const handleChange = (event) => {
    // console.log(event.target.value);
    setPrice(event.target.value)
    if (event.target.value === 'large') {
      setShow(`509 x 339 px (7.07 x 4.71 in)
      72 dpi|
      0.2 MP`)
    }
  }
  console.log('price',price);
  const addToCart = () => {
    //  product.price=price;
     console.log('price',price);
    addItem(product, () => {
      setRedirect(true);
    });
  };
  return (
    <Layout
      title={product.name}
      description={product.description}
      className="container-fluid"
    >
      {redirectUser()}
      <Container fluid className="mt-5">
        <Row>
          {product && product.description && (
            <>
              <Col md={8} className="mb-3 productDetails">
                {" "}
                {/* <Card product={product} viewProductButton={false} cssClassName="singleProduct" />{" "} */}
                <ShowImage item={product} url="product" />
                {/* Product All Info - category, description,  */}
              </Col>
              <Col md={4}>
                <div className="productInfo">
                  <p>All Royalty-Free licenses include global use rights, comprehensive protection, simple pricing with volume discounts available</p>
                  <div className="rightBox">
                    <div className="priceBox">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priceset"
                        value={product.extra_small_price}
                        id="extrasmall"
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="extrasmall"
                      >
                        Extra Small
                        <p>{showStatus}</p>
                      </label>
                      <div className="ImgPrice">
                        <p>{product.extra_small_price}</p>
                      </div>
                    </div>
                    <div className="priceBox">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priceset"
                        value={product.small_price}
                        id="small"
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="small"
                      >
                        Small
                        <p>{showStatus}</p>
                      </label>

                      <div className="ImgPrice">
                        <p>{product.small_price}</p>
                      </div>
                    </div>
                    <div className="priceBox">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priceset"
                        value={product.medium_price}
                        id="medium"
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="medium"
                      >
                        Medium
                        <p>{showStatus}</p>
                      </label>
                      <div className="ImgPrice">
                        <p>{product.medium_price}</p>
                      </div>
                    </div>
                    <div className="priceBox">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priceset"
                        value={product.large_price}
                        id="large"
                        onChange={handleChange}
                      />

                      <label
                        className="form-check-label"
                        htmlFor="large"
                      >
                        Large
                        <p>{showStatus}</p>
                      </label>

                      <div className="ImgPrice">
                        <p>{product.large_price}</p>
                      </div>
                    </div>
                    <div className="priceBox">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priceset"
                        value={0}
                        id="freeze"
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="freeze"
                      >
                        Market-freeze
                        <span>Protect your creative work - we'll remove this image from our site for as long as you need it.</span>
                      </label>

                    </div>
                  </div>

                  <div className="addCart">
                    <p>$ {price}</p>
                    <button onClick={addToCart}>Add to cart</button>
                  </div>


                </div>
              </Col>

            </>
          )}



          <Col md={12} className="mb-3 mt-5">
            <h2 className="text-center">Related Products</h2>
            <Row>
              {relatedProduct.map((p, i) => (
                <Col md={3}>
                  <Card key={i} product={p} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Product;
