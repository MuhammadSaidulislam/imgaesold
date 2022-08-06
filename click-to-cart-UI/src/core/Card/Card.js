import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "../ShowImage/ShowImage";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { addItem, updateItem, removeItem } from "../cartHelpers";

//css
import "./card.css";

const Card = ({
  product,
  viewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
  cssClassName = "",
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  //product add to cart
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  //redirect to cart page
  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  //update prodcut qnt
  const handelChnage = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  //show cart update options
  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handelChnage(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  //show remove item option for product
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-outline-danger mt-2 mb-2 ml-2"
        >
          Remove Product{" "}
        </button>
      )
    );
  };

  return (
    <>

      {shouldRedirect(redirect)}
      <div className="square-grid__item-container">
      <Link className="square-grid-item__link square-grid-item__link--dim" to={`/product/${product._id}`}>
          
          <ShowImage item={product} url="product" cssClassName={cssClassName} />
          <div className="square-grid-item__details square-grid-item__info">
              <div className="square-grid-item__contributor-name">{viewProductButton && (

                <h1 className="p_name">{product.name}</h1>
    
              )}</div>
              <div className="square-grid-item__item-id">{product.category && product.category.name}</div>
              
          </div>
      </Link>
  </div>

      {/*
    <div className="card-header cat-name">
        {product.category && product.category.name}
      </div>
      <div className="card-body">
        {product.quantity > 0 ? (
          <span className="badge badge-success badge-pill">
            In Stock
          </span>
        ) : (
          <span className="badge badge-danger badge-pill">Out of Stock</span>
        )}
        <ShowImage item={product} url="product" cssClassName={cssClassName} />
        <Link to={`/product/${product._id}`}>
          {viewProductButton && (

            <h1 className="p_name">{product.name}</h1>

          )}
        </Link>
        <div className="priceBox">
          <p className="price"> Price: &#2547;{product.price} </p>
          <span className="black-8">
            Last Update: {moment(product.createdAt).fromNow()}{" "}
          </span>
        </div>
        {!viewProductButton && (
          <p className="lead mt-2"> {product.description.substring(0, 500)} </p>
        )}
        {showAddToCartButton && (
         <div className="text-center cardButton" style={{margin: '10px 0px'}}>
            <button
            onClick={addToCart}
            className="btn text-center mb-2"
          >
            <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
          </button>
         </div>
        )}
        {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    */}
    </>
  );
};

export default Card;
