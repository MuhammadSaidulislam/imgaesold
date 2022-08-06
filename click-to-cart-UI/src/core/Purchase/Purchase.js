import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import moment from "moment";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../../auth/index";
import { Link } from "react-router-dom";
import { getOrderHistory } from "../apiCore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faMoneyCheck, faUserAlt } from "@fortawesome/free-solid-svg-icons";
const Dashboard = () => {
  //state
  const [history, setHistory] = useState([]);

  //get auth user data
  const {
    user: { _id, name, email, role },
  } = isAuthenticate();

  //get auth user token
  const { token } = isAuthenticate();

  //get user order history
  const init = (userId, token) => {
    getOrderHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
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
            <Link className="sideBarLink" to={`/purchase/history/${_id}`}>
            <FontAwesomeIcon icon={faMoneyCheck} /> Purchase History
            </Link>
          </li>
          <li className="list-group">
          <Link className="sideBarLink" to="/create/category">
            <p>Create Category</p>
          </Link>
        </li>
        <li className="list-group">
          <Link className="sideBarLink" to="/create/product">
            <p>Create Product</p>
          </Link>
        </li>
        </ul>
      </div>
    );
  };

  //show user purchase history
  const purchaseHistory = (history) => {
    return (
      <div className="card dashBoardCard mb-5">
        <h3 className="card-header text-center">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, i) => {
              return (
                <div>
                  <h4 className="text-danger">Status: {h.status}</h4>
                  {h.products.map((p, i) => {
                    return (
                      <div key={i}>
                        <h6>Product name: {p.name}</h6>
                        <h6>Product price: ${p.price}</h6>
                        <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  //return layout
  return (
    <Layout title="User Dashboard" description="User Dashboard">
      <Container fluid>
        <Row>
          <Col md={3}>{userLinks()}</Col>
          <Col md={9}>{purchaseHistory(history)}</Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Dashboard;
