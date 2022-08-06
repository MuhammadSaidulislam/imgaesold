import React, { useState, useEffect } from "react";
import Layout from "../core/Layout/Layout";
import  {Link} from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap";
import { isAuthenticate } from "../auth/index";
import { getUserInfo, upadetUserInfo, updateLocalStorageUser } from "./apiUser";
import { Redirect } from "react-router-dom";
import { getOrderHistory } from "../core/apiCore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faMoneyCheck, faUserAlt } from "@fortawesome/free-solid-svg-icons";
const Profile = (props) => {
  //state
  const [values, setValues] = useState({
    name: "",
    password: "",
    error: false,
    success: false,
  });
  const [history, setHistory] = useState([]);
  const { name, password, error, success } = values;

 //get user data and token
 const { user, token } = isAuthenticate();
 
  //get user info
  const init = (userId) => {
    getUserInfo(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name });
      }
    });
  };
  const {
    user: { _id, email, role },
  } = isAuthenticate();
  
  //get user order history
  const initt = (userId, token) => {
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
    initt(_id, token);
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
  //load
  useEffect(() => {
    init(props.match.params.userId);
  }, []);
 
  //handel change
  const handelChnage = name => e => {
  setValues({...values, error: false, [name]: e.target.value})
  };

  //on submit
  const clickSubmit = (e) => {
      e.preventDefault();
      upadetUserInfo(props.match.params.userId, token,  {name, password} ).then(data =>{
          if(data.error){
            setValues({ ...values, error: true });
          }else{
              updateLocalStorageUser(data, ()=>{
                setValues({ ...values, name: data.name, password: data.password, success: true });
              })
          }
      } )
  };

  //redirect user to dashboard
  const redirectUser = (success) => {
      if(success) {
          return <Redirect to="/user/dashboard" />
      }
  }

  //profile update component
  const profileUpdate = (name, password) => {
    return (
      <div className="card dashBoardCard mb-5">
      <h3 className="card-header text-center mb-5">Profile Info</h3>
            <form>
              <div className="form-group">
                <label className="text-muted"><p>Name</p> </label>
                <input
                  type="text"
                  onChange={handelChnage("name")}
                  className="form-control"
                  value={name}
                />
              </div>
              <div className="form-group">
                <label className="text-muted"><p>Password</p></label>
                <input
                  type="text"
                  onChange={handelChnage("password")}
                  className="form-control"
                  value={password}
                />
              </div>

             <div className="text-center">
             <button onClick={clickSubmit} className="btn btn-info">
                Update
              </button>
             </div>
            </form>

      </div>
    );
  };

  //return layout
  return (
    <Layout title="Update Profile" description="E-Commerce Website">
    <Container fluid>
    <Row>
      <Col md={3}>{userLinks()}</Col>
      <Col md={9}>
      {profileUpdate(name, password)}
      {redirectUser(success)}
      </Col>
    </Row>
  </Container>
      
    </Layout>
  );
};

export default Profile;
