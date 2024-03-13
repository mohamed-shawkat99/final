import logo from './logo.svg';
import './App.css';
import Home from './component/Home/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './component/Layout/Layout';
import Products from './component/Products/Products';
import Categories from './component/Categories/Categories';
import Cart from './component/Cart/Cart';
import Register from './component/Register/Register';
import Login from './component/Login/Login';
import Notfound from './component/Notfound/Notfound';
import Brands from './component/Brands/Brands';
import CounterContextProvider from './Context/CounterContext';
import TokenContextProvider from './Context/TokenContext';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import ProductDetails from './component/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import{ Toaster } from 'react-hot-toast';
import BrandsDetails from './component/BrandsDetails/BrandsDetails';
import CategoriesDetails from './component/CategoriesDetails/CategoriesDetails';
import CashOut from './component/CashOut/CashOut';
import AllOrder from './component/AllOrder/AllOrder';
import ForgetPassword from './component/ForgetPassword/ForgetPassword';
import VerifyReset from './component/VerifyReset/VerifyReset';
import ResetPassword from './component/ResetPassword/ResetPassword';
import WishlistContextProvider from './Context/wishlistContext';
import Wishlist from './component/Wishlist/Wishlist';


let routers = createBrowserRouter([
  {path:`/`,element:<Layout/>,children:[
    {path:`home`,element:<ProtectedRoute><Home/></ProtectedRoute> },
    {path:`products`,element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:`categories`,element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:`forget`,element:<ForgetPassword/>},
    {path:`ResetPassword`,element:<ResetPassword/>},
    {path:`CategoriesDetails/:id`,element:<ProtectedRoute><CategoriesDetails/></ProtectedRoute>},
    {path:`cart`,element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:`Wishlist`,element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:`CashOut`,element:<ProtectedRoute><CashOut/></ProtectedRoute>},
    {path:`VerifyReset`,element:<VerifyReset/>},
    {path:`register`,element:<Register/>},
    {index:true,element:<Login/>},
    {path:`brands`,element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:`allorders`,element:<ProtectedRoute><AllOrder/></ProtectedRoute>},
    {path:`BrandsDetails/:id`,element:<ProtectedRoute><BrandsDetails/></ProtectedRoute>},
    {path:`ProductDetails/:id`,element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:`*`,element:<Notfound/>},
  ]}
])


function App() {


  return  <WishlistContextProvider>
  <CartContextProvider>
   <TokenContextProvider> 
    <CounterContextProvider>
  <RouterProvider router={routers}></RouterProvider>
  <Toaster/>
  </CounterContextProvider>
  </TokenContextProvider>
  </CartContextProvider>
  </WishlistContextProvider>



    

}

export default App;
