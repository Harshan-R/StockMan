/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import ph from "./dollar.png";
import "./css/profile.css";
import { useState, useEffect } from "react";
import TransactionTable from "./TransactionTable";
import HoldingTable from "./HoldingTable";

function Profile() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let _user = JSON.parse(localStorage.getItem("user"));
      setUser(JSON.parse(localStorage.getItem("user")));
      console.log(user);
      fetch("http://localhost:8001/user/get_balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: _user.googleId,
        }),
      }).then(x => x.json()).then((x) => {
        console.log(x);
        setBalance(x.balance);
      });
    }
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-back">
        <div className="profile">
          {user && (
            <>
              <img
                className="profile-picture"
                src={user.imageUrl}
                alt="Profile Picture"
              />
            </>
          )}
          {!user && (
            <img className="profile-picture" src={ph} alt="Profile Picture" />
          )}
        </div>
        <div className="name">{user && <h2>{user.name}</h2>}</div>
        {user && <h3>Balance : {balance}</h3>}
      </div>

      <div className="content">
        <div className="left">
          <h2>Your holdings</h2>
          {user && <HoldingTable />}
        </div>
        <div className="right">
          <h2>Transaction details</h2>
          {user && (
            <TransactionTable user_name={user.googleId} entity_name={null} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
