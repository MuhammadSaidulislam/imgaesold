import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"
import Layout from "../core/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { signup } from '../auth/index'


const Signup = () => {
  //state
  let [error, setError] = useState(0);
  let [success, setSuccess] = useState(0);
  const [imgUrlBlob, setImgUrlBlob] = useState("");
  // preview image

  const blobImageHandler = e => {
    const fileList = e.target.files;
    const blobUrl = window.URL.createObjectURL(fileList[0]);
    setImgUrlBlob(blobUrl);
  };
  const form = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  //form on submit
  let onSubmit = () => {
    // const { name, email, password } = data;
    const userdata = new FormData(form.current);
    console.log(userdata);
    signup(userdata).then((data) => {
      console.log(data.error, data.err);
      if (data.error) {
        setError(data.error);
        setSuccess(0);
      } else {
        setSuccess(1);
        setError(0);
        setValue("name", "", { shouldValidate: false });
        setValue("email", "", { shouldValidate: false });
        setValue("password", "", { shouldValidate: false });
        setValue("photo", "", { shouldValidate: false });
      }
    });
  };

  //sign up form
  const singUPForm = () => (
    <Container className="center mt-5">
      <Row>
        <Col md={6} className="centerPosition">
          <h2 className="text-center">Sign UP</h2>

          <form ref={form} onSubmit={handleSubmit(onSubmit)}>
            <div className="image-item__btn-wrapper">
              <div className="product-img">
                {/* <img className="styled-img" src={imgUrlBlob} alt="" /> */}
              </div>

              <label className="custom-file-upload updateBtn">
                <input type="file" name="photo" id="photo" onChange={blobImageHandler} required />
                Upload Your profile Photo
              </label>
              <br />
 
            </div>
            <div className="form-group">
              <label htmlFor="name" className="text-muted">
                <strong>Name{" "}</strong>
                <span className="err">
                  {errors.name && "This Field is Required"}
                </span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="form-control"
                {...register("name", { required: true, maxLength: 32 })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-muted">
                <strong>Email{" "}</strong>
                <span className="err">
                  {errors.email && "This Field is Required"}
                </span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                className="form-control"
                {...register("email", { required: true })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-muted">
                <strong>Password{" "}</strong>
                <span className="err">
                  {errors.password && "This Fields is Required"}
                </span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                className="form-control"
                {...register("password", { required: true })}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );

  //show error msg
  const showError = () => {
    console.log(error);
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  //show success msg
  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        Account Create Successfully. Please <Link to="/signin">Signin</Link>
      </div>
    );
  };

  //retun the layout
  return (
    <Layout title="Signup" description="E-Commerce Website">
      {showSuccess()}
      {showError()}
      {singUPForm()}
    </Layout>
  );
};

export default Signup;
