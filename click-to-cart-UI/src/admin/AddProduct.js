import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../core/Layout/Layout";
import  {Link} from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { createProduct, getCategorys } from "./apiAdmin";
import { getOrderHistory } from "../core/apiCore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faMoneyCheck, faUserAlt } from "@fortawesome/free-solid-svg-icons";
const AddProdcut = () => {
  const form = useRef(null);
  //state
  let [category, setCategory] = useState([]);
  const [history, setHistory] = useState([]);
  let [values, setValues] = useState({
    loading: false,
    error: "",
    createProductName: "",
    redirectToProfile: false,
    categorys: [],
  });

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
  //get auth user data and token
  const { loading, error, createProductName } = values;

  //load categories and use it
  useEffect(() => {
    getCategorys().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategory((category) => data);
      }
    });
  }, []);


  //handle form submit
  const onSubmit = (data) => {

    const data1 = new FormData(form.current);
    //formData.set(data);

    setValues({ ...values, error: "", loading: true });

    //api call
    createProduct(user._id, token, data1)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          //  console.log(data.result.name)
          setValue("photo", "", { shouldValidate: false });
          setValue("name", "", { shouldValidate: false });
          setValue("description", "", { shouldValidate: false });
          setValue("extra_small_price", "", { shouldValidate: false });
          setValue("small_price", "", { shouldValidate: false });
          setValue("medium_price", "", { shouldValidate: false });
          setValue("large_price", "", { shouldValidate: false });
          setValue("quantity", "", { shouldValidate: false });
          setValue("shipping", "0", { shouldValidate: false });
          setValues({
            ...values,
            error: "",
            loading: false,
            createProductName: data.result.name,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //form for product add
  const newPostForm = () => {
    return (
      <div className="card dashBoardCard mb-5">
            <h3 className="card-header text-center">Add your product</h3>
            <form ref={form} className="mb-3" onSubmit={handleSubmit(onSubmit)}>
              <h5>Enter your product image</h5>{" "}
              <span className="err">{errors.photo && "This Field is Required"}</span>
              <div className="form-group">
                <label className="btn w-100">
                  <input className="form-control"
                    type="file"
                    accept="image/*"
                    {...register("photo", { required: true })}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="name">
                  Name{" "}
                  <span className="err">
                    {errors.name && "This Field is Required"}
                  </span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Product Name"
                  className="form-control"
                  {...register("name", { required: true, maxLength: 32 })}
                />
              </div>
              <input
              type="text"
              id="owner"
              value={user._id}
              placeholder="Product Name"
              className="form-control"
              {...register("owner", { required: true, maxLength: 32 })}
             hidden
            />
              <div className="form-group">
                <label htmlFor="description">
                  Description{" "}
                  <span className="err">
                    {errors.description && "This Field is Required"}
                  </span>
                </label>
                <textarea
                  type="text"
                  id="description"
                  placeholder="Product Description"
                  className="form-control"
                  {...register("description", { required: true, maxLength: 2000 })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">
                  Extra Small Price{" "}
                  <span className="err">
                    {errors.price && "This Field is Required"}
                  </span>
                </label>
                <input
                  type="number"
                  id="price"
                  placeholder="Product Price"
                  className="form-control"
                  {...register("extra_small_price", { required: true })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">
                  Small Price{" "}
                  <span className="err">
                    {errors.price && "This Field is Required"}
                  </span>
                </label>
                <input
                  type="number"
                  id="price"
                  placeholder="Product Price"
                  className="form-control"
                  {...register("small_price", { required: true })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">
                  Medium Price{" "}
                  <span className="err">
                    {errors.price && "This Field is Required"}
                  </span>
                </label>
                <input
                  type="number"
                  id="price"
                  placeholder="Product Price"
                  className="form-control"
                  {...register("medium_price", { required: true })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">
                  Large Price{" "}
                  <span className="err">
                    {errors.price && "This Field is Required"}
                  </span>
                </label>
                <input
                  type="number"
                  id="price"
                  placeholder="Product Price"
                  className="form-control"
                  {...register("large_price", { required: true })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">
                  Category{" "}
                  <span className="err">
                    {errors.category && "This Field is Required"}
                  </span>
                </label>
                <select
                  type="text"
                  id="category"
                  placeholder="Product Category"
                  className="form-control"
                  {...register("category", { required: true })}
                >
                  <option>Pleaes Select One</option>

                  {category.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="shipping">
                  Shipping{" "}
                  <span className="err">
                    {errors.shipping && "This Field is Required"}
                  </span>
                </label>
                <select
                  type="text"
                  id="shipping"
                  placeholder="Shipping"
                  className="form-control"
                  {...register("shipping", { required: true })}
                >
                  <option>Pleaes Select One</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="quantity">
                  Quantity{" "}
                  <span className="err">
                    {errors.quantity && "This Field is Required"}
                  </span>
                </label>
                <input
                  type="number"
                  id="quantity"
                  placeholder="Quantity"
                  className="form-control"
                  {...register("quantity", { required: true })}
                />
              </div>
              <button className="btn btn-outline-primary" type="submit">
                Create Product
              </button>
            </form>
  
      </div>
    );
  };

  //show error msg
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  //show success msg
  const showSuccess = () => (
    <div className="alert alert-info" style={{ display: createProductName ? "" : "none" }}>
      <h3> {`${createProductName} is Created !`} </h3>
    </div>
  );

  //show loadgin msg
  const showLoading = () => (
    loading && (<div className="alert alert-sucess"><h2>Loading</h2></div>)
  );


  //return layout
  return (
    <Layout title="Add New Product" description="E-Commerce Website" src="/images/product.png">
      <Container fluid>
      <Row>
        <Col md={3}>{userLinks()}</Col>
        <Col md={9}>
        {showLoading()}
        {showSuccess()}
        {showError()}
        {newPostForm()}
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};

export default AddProdcut;