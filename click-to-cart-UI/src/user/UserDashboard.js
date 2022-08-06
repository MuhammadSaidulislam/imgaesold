import React, { useState, useEffect } from "react";
import Layout from "../core/Layout/Layout";
import moment from "moment";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { Link } from "react-router-dom";
import { getOrderHistory } from "./apiUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faFileImage, faFileImport, faMoneyCheck, faUserAlt } from "@fortawesome/free-solid-svg-icons";

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
  const userInfo = () => {
    return (
      <div className="card dashBoardCard mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {" "}
            <strong> Name: </strong>
            {name}
          </li>
          <li className="list-group-item">
            {" "}
            <strong> Email: </strong> {email}
          </li>
          <li className="list-group-item">
            <strong> User Type: </strong>{" "}
            {role === 1 ? "Admin" : "Registred User"}
          </li>
        </ul>
      </div>
    );
  };

  //show user purchase history
  const purchaseHistory = (history) => {
    return (
      <div className="dashBoardCard mb-5">
        <h3 className="mb-5">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, i) => {
              return (
                <div>
                  <hr />
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
          <Col md={3} className="mt-3 mb-2">{userLinks()}</Col>
          <Col md={9} className="mt-3 mb-2">
            {userInfo()}
            {/* {purchaseHistory(history)} */}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Dashboard;
