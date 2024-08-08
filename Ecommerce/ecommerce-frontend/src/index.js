import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AdminProducts from './components/admin/products';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserProducts from './components/users/products';
import Login from './components/login';
import Register from './components/register';
import AddProducts from './components/admin/addproduct';
import Cart from './components/users/cart';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path : "/superadmin/products",
    element : <AdminProducts />,
  },
  {
    path : "/user/products",
    element : <UserProducts />,
  },
  {
    path : "/login",
    element : <Login />,
  },
  {
    path : "/register",
    element : <Register />,
  },
  {
    path : "/superadmin/add",
    element : <AddProducts />
  },
  {
    path : "/cart",
    element : <Cart />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
