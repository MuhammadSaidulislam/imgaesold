import React, { useState, useEffect } from "react";
import Layout from "../core/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { Link } from "react-router-dom";
import { getOrderHistory } from "./apiUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faFileImage, faFileImport, faMoneyCheck, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { byuser } from "../admin/apiAdmin";
import ShowImage from "../core/ShowImage/ShowImage";

const ProductShow = () => {
  //state
  const [history, setHistory] = useState([]);
  const [listProduct, setListProduct] = useState([]);

  //get auth user data
  const {
    user: { _id, name, email, role },
  } = isAuthenticate();

  //get auth user token
  const { token } = isAuthenticate();

  //get user order history
  const init = (userId, token) => {
    byuser(userId, token).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setListProduct(data);
      }
    });
  };

  //load
  useEffect(() => {
    init(_id, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //normal user accesable link
  const userLinks = () => {
    return (
      <div className="leftAdmin">
        <h4>My account</h4>
        <ul className="list-group userAdmin">
          <li className="list-group">
            <Link className="sideBarLink" to="/cart">
              <FontAwesomeIcon icon={faCartArrowDown} /> My Cart
            </Link>
          </li>
          <li className="list-group">
            <Link className="sideBarLink" to={`/profile/${_id}`}>
              <FontAwesomeIcon icon={faUserAlt} /> Profile
            </Link>
          </li>
          <li className="list-group">
            <Link className="sideBarLink" to={`/product/byuser/${_id}`}>
              <FontAwesomeIcon icon={faUserAlt} /> Product List
            </Link>
          </li>
          <li className="list-group">
            <Link className="sideBarLink" to={`/purchase/history/${_id}`}>
              <FontAwesomeIcon icon={faMoneyCheck} /> Purchase History
            </Link>
          </li>
          <li className="list-group">
            <Link className="sideBarLink" to="/create/category">
              <FontAwesomeIcon icon={faFileImport} /> Create Category
            </Link>
          </li>
          <li className="list-group">
            <Link className="sideBarLink" to="/create/product">
              <FontAwesomeIcon icon={faFileImage} /> Create Product
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  //show user basic info
  const productList = () => {
    return (
      <Container>
        <h3 className="card-header text-center">Product list</h3>
        <Row>
          {listProduct.map(data =>
            <Col md={6}>
              <div className="imgBox">     
              <ShowImage item={data} url="product" />
              </div>
              <div className="imgContent">
                <h5 className="">Name: {data.name}</h5>
                <p className="">Description: {data.description}</p>
                <div className="priceList">
                <p className="">Extra small Price: {data.extra_small_price}</p>
                <p className="">Large Price: {data.large_price}</p>
                <p className="">Medium Price: {data.medium_price}</p>
                <p className="">small Price: {data.small_price}</p>
                </div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    );
  };



  //return layout
  return (
    <Layout title="User Dashboard" description="User Dashboard">
      <Container fluid>
        <Row>
          <Col md={3} className="mt-3 mb-2">{userLinks()}</Col>
          <Col md={9} className="mt-3 mb-2">
            {productList()}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ProductShow;
