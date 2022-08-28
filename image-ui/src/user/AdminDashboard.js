import React from "react";
import Layout from "../core/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { Link } from "react-router-dom";
import './Main.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faEye, faFileExport, faFileImage, faFileImport, faList, faMoneyCheck, faUserAlt, faUserEdit, } from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {

  //get auth user data
  const {
    user: { _id, name, email, role },
  } = isAuthenticate();

  //admin accessable link
  const adminLinks = () => {
    return (
      <div className="leftAdmin">
        <h4 className="">Admin Links</h4>
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
            <Link className="sideBarLink" to={`/product/byuser/${_id}`}>
              <FontAwesomeIcon icon={faList} /> Product List
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
        </ul>
      </div>
    );
  };

  //admin info
  const adminInfo = () => {
    return (
      <div className="dashBoardCard mb-5">
        <h3 className="mb-5">Profile</h3>
        <h6>User details</h6>
        <ul className="list-group">
          <li className="list-group-item"><strong>Name: </strong> {name}</li>
          <li className="list-group-item"><strong>Email: </strong> {email}</li>
          <li className="list-group-item">
            <strong>User Type: </strong> {role === 1 ? "Admin" : "Registred User"}
          </li>
        </ul>
      </div>
    );
  };

  //return layout
  return (
    <Layout title="Admin Dashboard" description="Admin Dashboard" src="/images/dashBoard.png">
      <Container fluid>
        <Row>
          <Col md={3} className="mt-3 mb-2">
            {adminLinks()}
          </Col>
          <Col md={9} className="mt-3 mb-2">
            {adminInfo()}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AdminDashboard;
