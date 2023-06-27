import React, { useEffect, useRef, useState} from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./functions/auth";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute"
import Password from "./pages/user/Password";
import MyProducts from "./pages/user/MyProducts.jsx";
import Wishlist from "./pages/user/Wishlist";
import Chat from "./pages/user/Chat.jsx";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Lists from "./pages/admin/Lists.jsx";
import CategoryCreate from "./pages/admin/category/CategoryCreate"
import SendCoupon from "./pages/admin/category/SendCoupon.jsx"
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
 import Product from "./pages/Product";
 import CategoryHome from "./pages/category/CategoryHome.jsx"
 import SubHome from "./pages/sub/SubHome.jsx";
 import Shop from "./pages/Shop.jsx";
 import Cart from "./pages/Cart.jsx";
  import Services from "./pages/Services";
 import SideDrawer from "./components/drawer/SideDrawer.jsx";
 import Loaders from "./components/drawer/Loader";
 import Checkout from "./pages/Checkout.jsx";
 import CreateCouponPage from "./pages/admin/coupon/CreateCouponPage.jsx";
 import Payment from "./pages/Payment.jsx";
import Loader from "./components/drawer/Loader";

function App() {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true)
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);

        

          currentUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          
        })
        .catch((err) => console.log(err));
          
      }
    });
    
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
    setloading(false);
  }, 1000);

  return () => clearTimeout(timer);
  }, [])
  
  return (
    <>
      <Header />
    {
      
      loading ? (<Loaders/>) : (<> 
    <SideDrawer />
    <ToastContainer />
    <Switch>
      <Route exact path="/" component={Home } />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
         <Route exact path="/register/complete" component={RegisterComplete} />
         <Route exact path="/forgot/password" component={ForgotPassword} />
          <Route exact path="/services" component={Services} />
          <UserRoute exact path="/user/history" component={History} />
           <UserRoute exact path="/user/password" component={Password} />
           <UserRoute exact path="/user/myproducts" component={MyProducts} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <UserRoute exact path="/user/chat" component={Chat} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/sendcoupon" component={SendCoupon} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
         <AdminRoute exact path="/admin/sub" component={SubCreate} />
         <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
         <UserRoute exact path="/admin/product" component={ProductCreate} />
         <UserRoute exact path="/user/product" component={ProductCreate} />
         <AdminRoute exact path="/products" component={AllProducts} />
         <AdminRoute exact path="/admin/lists" component={Lists} />
          <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <UserRoute exact path="/user/product/:slug" component={ProductUpdate} />
          <Route exact path="/product/:slug" component={Product} />
           <Route exact path="/category/:slug" component={CategoryHome} />
            <Route exact path="/sub/:slug" component={SubHome} />
             <Route exact path="/shop" component={Shop} />
             <Route exact path="/cart" component={Cart} />
             <UserRoute exact path="/checkout" component={Checkout} />
              <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
              <UserRoute exact path="/payment" component={Payment} /></Switch></>)
    
    }
      
    </>
  );
}

export default App;
