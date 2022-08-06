import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import  {Link} from "react-router-dom"
import Layout from "../core/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { createCategory } from "./apiAdmin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { getOrderHistory } from "../core/apiCore";
import { faCartArrowDown, faMoneyCheck, faUserAlt } from "@fortawesome/free-solid-svg-icons";
const AddCategory = () => {
  //state
  let [error, setError] = useState(0);
  let [success, setSuccess] = useState(0);
  const [history, setHistory] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    user: { _id, name, email, role },
  } = isAuthenticate();
  //get user data and token
  const { user, token } = isAuthenticate();
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


  let onSubmit = (data) => {
    setSuccess(0);
    createCategory(user._id, token, data).then((data) => {
      if (data.error) {
        setSuccess(0);
        setError(1);
      } else {
        setSuccess(1);
        setValue("name", "", { shouldValidate: false });
        setError(0);
      }
    });
  };

  const newCategoryForm = () => (
    <div className="card dashBoardCard mb-5">
    <h3 className="card-header text-center">Add your Category</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name" className="text-muted">
               <h2>Category Name</h2>
                <span className="err">
                  {errors.name && "This Field is Required"}
                </span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Category Name"
                className="form-control"
                {...register("name", { required: true, maxLength: 32 })}
              />
            </div>

            <button className="btn btn-outline-primary" type="submit">
              Create Category
            </button>
          </form>
    </div>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success text-center"> Category Create Successfuly!! </h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger text-center"> Category Should be Unique </h3>;
    }
  };



  return (
    <Layout title="Add New Category" description="E-Commerce Website" src="/images/options.png">
      <Container fluid>
        <Row>
          <Col md={3}>{userLinks()}</Col>
          <Col md={9}>
          {showError()}
          {showSuccess()}
          {newCategoryForm()}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AddCategory;
