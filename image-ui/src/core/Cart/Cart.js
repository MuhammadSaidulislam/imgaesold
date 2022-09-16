import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { getCart } from '../cartHelpers';
import CartCard from '../CartCard/CartCard';
import Checkout from '../Checkout/Checkout';
import { Col, Container, Row, Table } from 'react-bootstrap';
import './Cart.css';


const Cart = () => {

    //state
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    //get cart data
    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const getTotal = () => {
        return items.reduce((currentvalue, nextValue) => {
            return currentvalue + nextValue.count * nextValue.price;
        }, 0);
    };

    //show products 
    const showItems = items => {
        return (
            <div className="cardLeft">
                <h1 className="text-center">Product Lists</h1>
                {/* <hr /> */}
                <Table className='text-center' responsive="sm">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Category</th>
                            <th>Delete</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {items.map((product, i) => (
                            <CartCard
                                key={i}
                                product={product}
                                cartUpdate={true}
                                showRemoveProductButton={true}
                                setRun={setRun}
                                run={run}
                            />
                        ))}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <th>Total</th>
                            <th>&#2547;{getTotal()}</th>
                        </tr>
                    </tbody>

                </Table>
            </div>
        );
    };

    //show cart empty msg
    const noItemsMessage = () => (
        <Container>
            <Row>
                <div className='mt-5 mb-5'>
                    <h2 id="darkBlue">
                        Your shopping cart is empty!
                    </h2>
                    <Link to="/shop">Continue shopping</Link>
                </div>
            </Row>
        </Container>

    );

    //return the layout
    return (
        <Layout
            title="Cart"
            description="Manage your cart items."
            src="/images/trolley.png"
            className="container-fluid"
        >

            <div className="row">
                <Col md={12}>
                    <h1 className='text-center'>Shopping cart</h1></Col>
                <div className="col-8">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>
                <div className="col-4 mt-5 cardRight">
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;