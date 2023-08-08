/* eslint-disable jsx-a11y/img-redundant-alt */
import "./css/Stockpage.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import defaultLogo from "./dollar.png";
import TransactionTable from "./TransactionTable";
import HoldingTable from "./HoldingTable";

const CryptoStockpage = () => {
  const [stock, setStock] = useState({});
  const { key } = useParams();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [qty, setQty] = useState(0);
  const [holding, setHolding] = useState(0);

  useEffect(() => {
    console.log(key);
    let entity_name = "crypto/" + key;
    if (localStorage.getItem("user")) {
      console.log(localStorage.getItem("user"));
      setUser(JSON.parse(localStorage.getItem("user")));
      let _user = JSON.parse(localStorage.getItem("user"));
      fetch("http://localhost:8001/user/get_balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: _user.googleId,
        }),
      })
        .then((x) => x.json())
        .then((x) => {
          console.log(x);
          setBalance(x.balance);
        });
      fetch("http://localhost:8001/user/get_holding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: _user.googleId,
          key: entity_name,
        }),
      })
        .then((x) => x.json())
        .then((x) => {
          console.log(x);
          setHolding(x.count);
        });
    }
    fetch(`http://localhost:8001/crypto/${key}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStock(data);
      })
      .catch((error) => console.error(error));
  }, [key]);

  const buyHandler = () => {
    console.log("inside buy");
    if (qty * stock.price > balance) {
      alert("Insifficient balance");
      return;
    }
    fetch("http://localhost:8001/user/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: user.googleId,
        name: "crypto/" + key,
        count: qty,
        price: stock.price,
        type: "crypto",
      }),
    }).then((x) => window.location.reload());
  };

  const sellHandler = () => {
    console.log("inside sell");
    fetch("http://localhost:8001/user/sell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: user.googleId,
        name: "crypto/" + key,
        count: qty,
        price: qty * stock.price,
        type: "crypto",
      }),
    }).then((x) => window.location.reload());
  };

  return (
    <>
      <div class="contentBx">
        <center>
          <img
            src={stock.img ?? defaultLogo}
            alt="image"
            height={250}
            width={250}
          ></img>
          <h2 className="stockname">{stock.name}</h2>
          <div class="extock">
            <div className="price_change">
              <div className="text">Price : {stock.price}</div>
              <div className="text">Change : {stock.change_24h?.percent}%</div>
            </div>
            {user && (
              <div>
                <h3>Balance : {balance}</h3>
                <div className="buttons">
                  <br></br>
                  <button className="text" onClick={buyHandler}>
                    Buy
                  </button>
                  <button className="text" onClick={sellHandler}>
                    Sell
                  </button>
                </div>
                <br></br>
                <input
                  placeholder="quantity to buy / sell"
                  onChange={(e) => setQty(parseFloat(e.target.value))}
                ></input>
                <p>Cost of deal : {qty * stock.price}</p>
              </div>
            )}
          </div>
        </center>
      </div>
      {user && (
        <HoldingTable user_name={user.googleId} entity_name={"nse/" + key} />
      )}
      {user && (
        <>
          <TransactionTable
            user_name={user.googleId}
            entity_name={"crypto/" + key}
          />
          <br></br>
          {"     "}
          <span></span>
        </>
      )}
    </>
  );
};

export default CryptoStockpage;
