import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { updateItem, removeItem } from "../cartHelpers";
import "./CartCard.css";
import { Table } from "react-bootstrap";
import ShowImage from "../ShowImage/ShowImage";
const CartCard = ({
  product,
  viewProductButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  //state
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);


  console.log('product',product);


  //redirect user to cart page
  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  //hanel cart product
  const handelChnage = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  //show cart product update option 
  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <>
            <input
              id="adjust"
              type="number"
              className="form-control"
              value={count}
              onChange={handelChnage(product._id)}
            />
        </>
      )
    );
  };

  //show cart product remove option
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-outline-danger"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )
    );
  };


  return (
    <>
      {shouldRedirect(redirect)}
            <tr>
              <th>
                <Link to={`/product/${product._id}`}>
                  {viewProductButton && (
                    <p className="p_cart">{product.name}</p>
                  )}
                </Link>
              </th>
              <th className="cartImage"><ShowImage item={product} url="product" /></th>
              <th>{product.category && product.category.name}</th>
              <th>
              {showRemoveButton(showRemoveProductButton)}
            </th>
              <th className="priceValue">
                  &#2547; {product.price}{" "}
              </th>
             
            </tr>
     
       

      </>


  );
};

export default CartCard;
