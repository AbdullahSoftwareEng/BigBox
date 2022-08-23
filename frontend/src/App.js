import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

//Cart Imports
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import WrappedPayment from './components/cart/WrappedPayment';
import OrderSuccess from './components/cart/OrderSuccess';

//Order Imports
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

//Auth or User imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

//Admin Imports
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';



import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import store from './store'
import axios from 'axios';




function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');  
  const { loading , user} = useSelector(state => state.auth);
  console.log(loading,user);
  useEffect( ()=>{
   
    store.dispatch(loadUser());
    async function getStripeApiKey(){
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey (data.stripeApiKey)
    }

    getStripeApiKey()

  },[])
  return (
    <Router>
      
    <div className="App">
     
        <Header/>
        
          <Routes>
            <Route path = "/" element = {<Home/>} exact/>
            <Route path = "/search/:keyword" element = {<Home/>} />
            <Route path = "/product/:id" element = {<ProductDetails/>} exact/>
            <Route path = "/login" element= {<Login/>}/>
            <Route path = "/register" element= {<Register/>}/>
            <Route path = "/password/forgot" element= {<ForgotPassword/>} exact/>
            <Route path = "/password/reset/:token" element= {<NewPassword/>} exact/>
            <Route path = "/cart" element = {<Cart/>} exact/>

            
            <Route element={<ProtectedRoute/>}>
            
            <Route path = "/me" element= {<Profile/>} exact/>
            <Route path = "/me/update" element= {<UpdateProfile/>} exact/>
            <Route path = "/password/update" element= {<UpdatePassword/>} exact/>
            <Route path = "/shipping" element= {<Shipping/>} exact/>
            <Route path = "/order/confirm" element= {<ConfirmOrder/>} exact/>
            <Route path = "/success" element= {<OrderSuccess/>} exact/>
            <Route path = "/orders/me" element= {<ListOrders/>} exact/>
            <Route path = "/order/:id" element= {<OrderDetails/>} exact/>
            
            <Route path = "/dashboard" element= {<Dashboard isAdmin={true} />} exact/>
            <Route path = "/admin/products" element= {<ProductsList isAdmin={true} />} exact/>
            <Route path = "/admin/product" element= {<NewProduct isAdmin={true} />} exact/>
            <Route path = "/admin/product/:id" element= {<UpdateProduct isAdmin={true} />} exact/>
            <Route path = "/admin/orders" element= {<OrdersList isAdmin={true} />} exact/>
            <Route path = "/admin/order/:id" element= {<ProcessOrder isAdmin={true} />} exact/>
            <Route path = "/admin/users" element= {<UsersList isAdmin={true} />} exact/>
            <Route path = "/admin/user/:id" element= {<UpdateUser isAdmin={true} />} exact/>
            <Route path = "/admin/reviews" element= {<ProductReviews isAdmin={true} />} exact/>

            <Route path = "/payment" element= {<WrappedPayment stripeApiKey={stripeApiKey}/>} exact/>
            </Route>
            

          </Routes>
          
          <Footer/>
        {/* {!loading && user && user.role !== 'admin' && (
          <Footer/>
        )} */}
        
      
    </div>
    
    </Router>
  );
}

export default App;
