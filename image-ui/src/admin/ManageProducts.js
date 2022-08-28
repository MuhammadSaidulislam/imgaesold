import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { getProducts, deleteProduct } from "./apiAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit ,faCartArrowDown, faEye, faFileExport, faFileImage, faFileImport, faList, faMoneyCheck, faUserAlt, faUserEdit, } from "@fortawesome/free-solid-svg-icons";

const ManageProducts = () => {
  //state
  const [products, setProducts] = useState([]);

  //get user data and token
  const { user, token } = isAuthenticate();
  const {
    user: { _id, email, role },
  } = isAuthenticate();
  //get product info
  const loadProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };
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
  const managePro = () => {
    return (
      <Container>
      <Row>
        <Col md={12} className="mb-3">
          <h2 className="text-center">Total Products: {products.length}</h2>
          <hr />

          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product Name</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={i}>
                  <td scope="row">{i}</td>
                  <td>
                    <strong>{p.name}</strong>
                  </td>
                  <td>
                  <Link to={`/admin/product/update/${p._id}`}>
                      <p className="text-info">
                      <FontAwesomeIcon icon={faEdit} /> Update
                      </p>
                    </Link>
                  </td>
                  <td>
                  <p
                      onClick={() => removeProduct(p._id)}
                      className="text-danger"
                    >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </p>
                  </td>
                  {/* <td>
                    {" "}
                    <Link to={`/admin/product/update/${p._id}`}>
                      <p className="badge badge-info badge-pill">
                      <FontAwesomeIcon icon={faEdit} /> Update
                      </p>
                    </Link>
                  </td> */}
                  {/* <td>
                    {" "}
                    <p
                      onClick={() => removeProduct(p._id)}
                      className="badge badge-danger badge-pill"
                    >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                    </p>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
    )}
  //delete a product
  const removeProduct = (prodcutId) => {
    deleteProduct(prodcutId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProduct();
      }
    });
  };
   
  //load product info
  useEffect(() => {
    loadProduct();
  }, []);
  
  //return the layout
  return (
    <Layout
      title="Manage Products"
      description="E-Commerce Website"
      className="container-fluid"
    >
    <Row>
          <Col md={3}>{userLinks()}</Col>
          <Col md={9}>{managePro()}</Col>
        </Row>
     

    </Layout>
  );
};

export default ManageProducts;
