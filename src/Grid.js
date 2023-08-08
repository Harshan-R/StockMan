import React, { useEffect, useState } from "react";
import Entity from "./Entity";

const Grid = (props) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [nseData, setNseData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/crypto/list")
      .then((response) => response.json())
      .then((data) => {
        console.log("Crypto", data.data);
        setCryptoData(data.data);
      });
      fetch("http://localhost:8001/nse/list")
      .then((response) => response.json())
      .then((data) => {
        console.log("NSE", data.data);
        setNseData(data.data);
      });
  }, []);


  function generate(arr1, arr2) {
    return [...arr1, ...arr2].sort(() => Math.random() - 0.2);
  }

  return (
    <div className="grid">
      {cryptoData &&
        nseData &&
        generate(cryptoData, nseData).map((item, index) => (
          <Entity
            key={index}
            imageURL={item.img}
            type={item.type}
            name={item.name}
            symbol={item.symbol}
            price={item.price}
            percentChange={item.change_24h.percent}
          />
        ))}
    </div>
  );
};

export default Grid;
