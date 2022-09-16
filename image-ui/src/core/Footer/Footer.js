import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faHome, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import './Footer.css'
                                  

const Footer = () => {

  return (
    <div className="footerDiv">

      <footer className="text-lg-start text-muted footer">
        
        <h3 className="text-left brandNameFooter">Bay Images</h3>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Description
                </h6>
                <p>
                We are the world’s foremost visual experts—capturing, creating and preserving content to elevate visual communications everywhere. By identifying cultural shifts, spearheading trends and powering the creative economy, we fuel visual storytelling worldwide.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">LINKS</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Home
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Shop
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Cart
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Sign Up
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Dashboard
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                <FontAwesomeIcon icon={faHome} /> 94/A Narayanganj 1420, Bangladesh
                </p>
                <p>
                <FontAwesomeIcon icon={faEnvelope} />
                   Jahidalamapu@gmail.com
                </p>
                <p>
                <FontAwesomeIcon icon={faPhone} /> + 88 01626168600
                </p>
                <p>
                <FontAwesomeIcon icon={faPhone} /> + 88 01701951953
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
         
        >
          © 2021 Copyright:
          <a className="text-reset fw-bold" href="">
            Bay Images
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
