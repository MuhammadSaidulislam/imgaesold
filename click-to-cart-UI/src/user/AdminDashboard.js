import React from "react";
import Layout from "../core/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { Link } from "react-router-dom";
import './Main.css'

const AdminDashboard = () => {

  //get auth user data
  const {
    user: { name, email, role },
  } = isAuthenticate();

  //admin accessable link
  const adminLinks = () => {
    return (
      <div className="leftAdmin">
        <h4 className="">Admin Links</h4>
        <ul className="list-group">
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
          <li className="list-group">
            <Link className="sideBarLink" to="/admin/orders">
              <p>View Orders</p>
            </Link>
          </li>
          <li className="list-group">
            <Link className="sideBarLink" to="/admin/products">
              <p>Manage Products</p>
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
                <Col md={3} className="borderLine">
                    {adminLinks()}
                </Col>
                <Col md={9}>
                    {adminInfo()}
                </Col>
            </Row>
      </Container>
    </Layout>
  );
};

export default AdminDashboard;
