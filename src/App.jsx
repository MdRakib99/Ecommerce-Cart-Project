import React from "react";
import { GetToken } from "./Utility/TokenHelper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListPage from "./Pages/ProductListPage";
import CartListpage from "./Pages/CartListpage";
import UserLoginPage from "./Pages/UserLoginPage";
import OTPPage from "./Pages/OTPPage";

const App = () => {
  if (GetToken()) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductListPage />} />
          <Route path='/cart' element={<CartListpage />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProductListPage />} />
          <Route path='/login' element={<UserLoginPage />} />
          <Route path='/otp' element={<OTPPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
};

export default App;
