import React, { useState, useEffect } from "react";
import Layout from "../core/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { getOrderList, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faEye, faFileExport, faFileImage, faFileImport, faList, faMoneyCheck, faUserAlt, faUserEdit, } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Orders = () => {
  //state
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  //get user data and token
  const { user, token } = isAuthenticate();
  const {
    user: { _id, name, email, role },
  } = isAuthenticate();
  const loadOrders = () => {
    // console.log(user._id);
    getOrderList(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatus = () => {
    //console.log(user._id);
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatus();
  }, []);

  const showTotalOrder = () => {
    if (orders.length) {
      return (
        <h2 className="text-danger">Total orders: {orders.length}</h2>
      );
    } else {
      return <h2 className="text-danger text-center mt-3 text-bold">NO ORDER</h2>;
    }
  };

  const showProductDetails = (key, value) => {
    return (
      <div className="input-group mb-2 mr-2 mr-sm-2">
        <div className="input-group-text"> <strong>{key}</strong> </div>
        <input type="text" value={value} className="form-control" readOnly />

      </div>
    );
  };

  const handleChange = (e, orderId) => {

    updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
      if (data.error) {
        console.log(data.error)
      }
      else {
        loadOrders();
      }
    })
  }

  const showStatus = (order) => {
    return (
      <div className="form-group">
        {" "}
        <h3 className="mark mb-4">Status: {order.status}</h3>{" "}
        <select className="form-control" onChange={(e) => handleChange(e, order._id)}>
          <option>Update Status</option>
          {statusValues.map((status, index) => (<option key={index} value={status}>{status}</option>))}
        </select>
      </div>
    );
  };
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
              <FontAwesomeIcon icon={faList} /> Product List
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
              <FontAwesomeIcon icon={faFileExport} /> Create Product
            </Link>
          </li>
          {isAuthenticate() && isAuthenticate().user.role === 1 && (
            <>
              <li className="list-group">
                <Link className="sideBarLink" to="/admin/orders">
                  <FontAwesomeIcon icon={faEye} />  View Orders
                </Link>
              </li>
              <li className="list-group">
                <Link className="sideBarLink" to="/admin/products">
                  <FontAwesomeIcon icon={faUserEdit} /> Manage Products
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    );
  };
  return (
    <Layout title="All Orders" description="E-Commerce Website" src="/images/checklist.png">
      <Container fluid>
        <Row>
          <Col md={3}>{userLinks()}</Col>
          <Col md={9}>
          <h1 className="text-center mt-3"> {showTotalOrder()}</h1>
            {orders.map((order, orderIndex) => {
              // console.log(order)
              return (
                <Container fluid>
                  <Row>
   
                    <Col md={12}>
                      {showStatus(order)}
                    </Col>
                    <Col md={6}>
                      <div
                        className=""
                        key={orderIndex}

                      >
                        <ul className="list-group mb-2">
                          <li className="list-group-item">
                            <strong>Order ID: </strong>  {order._id}
                          </li>
                          <li className="list-group-item">
                            <strong>Transaction ID: </strong>  {order.transaction_id}
                          </li>
                          <li className="list-group-item"><strong> Amount: </strong>&#2547; {order.amount}</li>
                        </ul>
                      </div>
                    </Col>
                    <Col md={6}>
                      <ul className="list-group mb-2">
                        <li className="list-group-item">
                          <strong> Order By:  </strong> {order.user.name}
                        </li>
                        <li className="list-group-item">
                          <strong>Order Placed:  </strong> {moment(order.createdAt).fromNow()}
                        </li>
                        <li className="list-group-item">
                          <strong> Delivery Address:  </strong>{order.address}
                        </li>
                      </ul>
                    </Col>
                    <h3 className="mt-4 mb-4">
                      Total products in the order : {order.products.length}
                    </h3>

                    {order.products.map((product, productIndex) => (
                      <Col md={6}
                        className="mb-4"
                        key={productIndex}
                        style={{ padding: "20px", border: "1px solid indigo" }}
                      >
                        {showProductDetails("Product Name", product.name)}
                        {showProductDetails("Product Price", product.price)}
                        {showProductDetails("Product Total", product.count)}
                        {showProductDetails("Product ID", product._id)}
                      </Col>
                    ))}
                  </Row>
                </Container>
              );
            })}
          </Col>
        </Row>
      </Container>


    </Layout>
  );
};

export default Orders;
