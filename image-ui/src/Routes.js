import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//get all components
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home/Home";
import Shop from "./core/Shop/Shop";
import UserDashboard from "./user/UserDashboard";
import Profile from "./user/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import UpdateProduct from "./admin/UpdateProduct";
import Orders from "./admin/Orders";
import ManageProducts from "./admin/ManageProducts";
import AdminDashboard from "./user/AdminDashboard";
import Product from "./core/Product/Product";
import Cart from "./core/Cart/Cart";
import Purchase from "./core/Purchase/Purchase";
import Contact from "./core/Contact/Contact";
import ProductShow from "./user/ProductShow";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/product/:productId" exact component={Product} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <Route path="/create/category" exact component={AddCategory} />
        <Route path="/create/product" exact component={AddProduct} />
        <Route
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/purchase/history/:userId" exact component={Purchase} />
        <Route path="/product/byuser/:userId" exact component={ProductShow} />
        <Route path="/contact" exact component={Contact} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
