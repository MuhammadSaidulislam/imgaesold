import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "../apiCore";
import { emptyCart } from "../cartHelpers";
import { saveAs } from 'file-saver';
import { isAuthenticate } from "../../auth/index";
import DropIn from "braintree-web-drop-in-react";
import './Checkout.css'



const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  //get total price
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
    loading: false,
    address: "",
  });
  
  //get auth user info
  const userId = isAuthenticate() && isAuthenticate().user._id;
  const token = isAuthenticate() && isAuthenticate().token;
  
  //get payment token
  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        // console.log(data.clientToken);
        setData({ clientToken: data.clientToken });
      }
    });
  };
  
  //generate token on load
  useEffect(() => {
    getToken(userId, token);
  }, []);
 
  //get total price
  const getTotal = () => {
    return products.reduce((currentvalue, nextValue) => {
      return currentvalue + nextValue.count * nextValue.price;
    }, 0);
  };

  //show the checkout/singin button
  const showCheckout = () => {
    return isAuthenticate() ? (
      <div> {showDropIn()} </div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sing in to Checkout</button>
      </Link>
    );
  };

  let delivery = data.address

  //confirm pay
  const buy = () => {
    setData({ loading: true });

    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data);
        nonce = data.nonce;

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((respone) => {
            console.log('getProduct',products.length);
            // const imgUrl=products[0]._id
            var request = new XMLHttpRequest();
            request.open('GET', `http://localhost:8000/api/product/photo/${products[0]._id}`, true);
            request.responseType = 'blob';
            request.onload = function() {
                var reader = new FileReader();
                reader.readAsDataURL(request.response);
                reader.onload =  function(e){
                    const imgurl=e.target.result;
                    saveAs(`${imgurl}`, 'image.jpg')
                };
            };
            
            request.send(); 

            // image download end





            const orderData = {
              products: products,
              transaction_id: respone.transaction.id,
              amount: respone.transaction.amount,
              address: delivery,
            };
            createOrder(userId, token, orderData)
              .then((ord) => {

                emptyCart(() => {
                  setRun(!run);
                  setData({ loading: false, success: true });
                  // console.log("Cart Empty");
                });
              })
              .catch((orderErr) => {
                console.log(orderErr);
              });
          })
          .catch((err) => {
            setData({ loading: false });
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
        setData({ ...data, error: error.message });
      });
  };
 
  const handelAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };
   
  //show the drop in
  const showDropIn = () => {
    return (
      <div onBlur={() => setData({ ...data, error: "" })}>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <div className="form-group mb-3 deliveryBox">
              <h4 className="text-dark">Shipping address: </h4>
              <textarea
                onChange={handelAddress}
                className="form-control"
                value={data.address}
                placeholder="Enter your delivery address"
              />
            
            </div>{" "}
            <h4 className="text-dark">Card Payment: </h4>
            <DropIn
              options={{ authorization: data.clientToken }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <button onClick={buy} className="btn btn-success btn-block">
              Confirm Order
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  //show error msg
  const showError = (error) => {
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
  const showSucess = (success) => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        {"Thanks! Your Payment was Successful!"}
      </div>
    );
  };

  //show loading msg
  const showLoading = (loading) => {
    return loading && <h2>Loading ...</h2>;
  };

  return (
    <div>
      {showError(data.error)}
      {showSucess(data.success)}
      {showLoading(data.loading)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
