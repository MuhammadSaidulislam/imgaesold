import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticate } from "../../auth/index";
import { itemTotal } from "../cartHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "../Search/Search";
import {
  faCartPlus,
  faSignInAlt,
  faUserPlus,
  faHome,
  faStore,
  faChartLine,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

//css
import "./Menu.css";
import ShowImage from "../ShowImage/ShowImage";

//set active page color code
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff5959" };
  } else {
    return { color: "white" };
  }
};
const { user, token } = isAuthenticate();
const Menu = ({ history }) => {

  // all menu item
  return (
    <div className="navbar_nav">
  
      <Navbar expand="lg" >
        <Navbar.Brand as={Link} to="/" className="brandName">
          Images
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ml-auto">

        

            <Nav.Link as={Link} to="/" style={isActive(history, "/")}>
              <FontAwesomeIcon icon={faHome} /> <span className="navItem">Home</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/shop" style={isActive(history, "/shop")}>
              <FontAwesomeIcon icon={faStore} /><span className="navItem">  Shop </span>
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" style={isActive(history, "/cart")}>
              <FontAwesomeIcon icon={faCartPlus} /> <sup> {itemTotal()}</sup> <span className="navItem">Cart </span>
            </Nav.Link>

            {isAuthenticate() && isAuthenticate().user.role === 0 && (
              <>
              <Nav.Link
                as={Link}
                to="/user/dashboard"
                style={isActive(history, "/user/dashboard")}
              >
                <FontAwesomeIcon icon={faChartLine} />
                <span className="navItem"> Dashboard</span>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/user/dashboard"
                style={isActive(history, "/user/dashboard")}
                className='navImage'
              >
            {/*   <ShowImage id={user._id} type='user' /> */}
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqZZYSsnncqDhroX4Ud9rgHCxpDeyLSN5PdG71BuDAk-ulL4CQCFtjL4lKVH26UIW9EOo&usqp=CAU"  alt="profileImage" />
                <span className="navItem"> Name</span>
              </Nav.Link>
              </>
            )}

            {isAuthenticate() && isAuthenticate().user.role === 1 && (
            <>
            <Nav.Link
            as={Link}
            to="/admin/dashboard"
            style={isActive(history, "/admin/dashboard")}
   
          >
            <FontAwesomeIcon icon={faChartLine} />  <span className="navItem"> Dashboard</span>
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/user/dashboard"
            style={isActive(history, "/user/dashboard")}
            className='navImage'
          >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqZZYSsnncqDhroX4Ud9rgHCxpDeyLSN5PdG71BuDAk-ulL4CQCFtjL4lKVH26UIW9EOo&usqp=CAU" alt="profileImage" />
            <span className="navItem"> Name</span>
          </Nav.Link>
            </>
            )}

            {!isAuthenticate() && (
              <>
                <Nav.Link
                  as={Link}
                  to="/signin"
                  style={isActive(history, "/signin")}
                >
                  <FontAwesomeIcon icon={faSignInAlt} />  <span className="navItem"> Signin</span>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                  style={isActive(history, "/signup")}
                >
                  <FontAwesomeIcon icon={faUserPlus} />  <span className="navItem"> Signup</span>
                </Nav.Link>
              </>
            )}

            {isAuthenticate() && (
              <>
                <Nav.Link
                  as={Link}
                  to="/"
                  style={{ cursor: "pointer", color: "white" }}
                  onClick={() =>
                    signout(() => {
                      history.push("/");
                    })
                  }
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />  <span className="navItem"> Signout</span>
                </Nav.Link>
              </>
            )}
          
            <Nav.Link as={Link} to="/contact" style={isActive(history, "/contact")}>
             <span className="navItem">Contact</span>
          </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
   
    </div>
  );
};

export default withRouter(Menu);
