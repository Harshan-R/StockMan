import "./css/App.css";
import Homepage from "./Homepage";
import CryptoStockPage from "./CryptoStockPage";
import NseStockPage from "./NseStockPage";
import BseStockPage from "./BseStockPage";
import ErrorPage from "./ErrorPage";
import Header from "./Header";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" exact element={<Homepage />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/crypto/:key" exact element={<CryptoStockPage />} />
            <Route path="/nse/:key" exact element={<NseStockPage />} />
            <Route path="/bse/:key" exact element={<BseStockPage />} />
            <Route  path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
