import './css/Stockpage.css';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import defaultLogo from "./bse.jpg"

const BseStockPage = () => {
  
  const [stock, setStock] = useState({});
  const { key } = useParams();

useEffect(() => {

  console.log(key);
  fetch(`http://localhost:8001/bse/${key}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setStock(data)
    })
    .catch((error) => console.error(error));
}, [key]);

  return (
    <>
      <div className="containere">
      <div className="left">
          <div class="container">
            <div class="card">
              <div class="imgBx">
              <img src={stock.img ?? defaultLogo} alt="image"></img>
              </div>
              <div class="contentBx">
                <h2>
                  {stock.symbol} <h5></h5>
                </h2>
                <br></br>

                <div class="extock">
                <a>Price : {stock.price}</a>
                  <a>Change : {stock.change_24h}%</a>
                  <a href="#">Buy</a>
                  {/* <br></br> */}
                  <a href="#s">Sell</a>
                  
                </div>

                
              </div>
            </div>
            
          </div>
          {/* <div class="wrapper">
        <div class="typing-demo">STOCKS HEIST VRAAH</div>
      </div> */}
      
        </div>
        <div className="right">{
          //  <><h1>{imageSrc}</h1><p>Price: {pricee}</p><p>24h Change: {stock.change_24h}</p></>
        }</div>
        
      </div>
    </>
  );
};

export default BseStockPage;