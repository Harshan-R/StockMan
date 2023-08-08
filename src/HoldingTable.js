import React, { useState, useEffect } from "react";
import "./css/TransactionTable.css";
import { Link } from "react-router-dom";

function HoldingTable({ user_name, entity_name }) {
  const [jsonData, setJsonData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let _user = JSON.parse(localStorage.getItem("user"));
      console.log(localStorage.getItem("user"));
      setUser(JSON.parse(localStorage.getItem("user")));
      fetch("http://localhost:8001/user/get_holding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: _user.googleId, entity_name }),
      })
        .then((res) => res.json())
        .then((data) => {
          setJsonData(data);
          console.log("holdings", data);
        });
    }
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Entity</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {jsonData.length !== 0 &&
          jsonData.map((item, index) => (
            <tr key={index}>
              <td className="entity">
                <Link to={"/" + item["entity_name"]} target="_blank">
                  {item["entity_name"]}
                </Link>
              </td>
              <td className="entity">{item["count"]}</td>
            </tr>
          ))}
        {jsonData.length === 0 && <p>No Holding so far</p>}
      </tbody>
    </table>
  );
}

export default HoldingTable;
