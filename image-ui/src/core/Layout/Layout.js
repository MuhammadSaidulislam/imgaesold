import React from "react";
import Menu from "../Menu/Menu";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../Footer/Footer";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style.css";
import "./Layout.css";

const Layout = ({
  title = "Title",
  description = "Description",
  src = "",
  children,
  className,
}) => {

  //show the menu and slider
  return (
    <div>
      <Menu />
      {/* <Container fluid className="mb-5">
        <Row>

            <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/banner_02.png"  
              alt="First slide"
              height="400px"
              width="100%"
            />
            <Carousel.Caption>
            <h2 className="layoutH2 text-center">{title}</h2>
            <p className="descriptionP">{description}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/banner_01.png"
              alt="Second slide"
              height="400px"
              width="100%"
            />

            <Carousel.Caption>
            <h2 className="layoutH2 text-center">{title}</h2>
            <p className="descriptionP">{description}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/banner_02.png"
              alt="Third slide"
              height="400px"
              width="100%"
            />

            <Carousel.Caption>
            <h2 className="layoutH2 text-center">{title}</h2>
            <p className="descriptionP">{description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </Row>
      </Container> */}

      <div className={className}>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
