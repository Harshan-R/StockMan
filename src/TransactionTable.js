import React, { useState, useEffect } from "react";
import "./css/TransactionTable.css";
import { Link } from "react-router-dom";

function TransactionTable({ user_name, entity_name }) {
  const [jsonData, setJsonData] = useState([]);

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  useEffect(() => {
    fetch("http://localhost:8001/user/get_transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name, entity_name }),
    })
      .then((res) => res.json())
      .then((data) => setJsonData(data));
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Action</th>
          <th>Name</th>
          <th>Price</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {jsonData.length !== 0 &&
          jsonData.map((item, index) => (
            <tr key={index}>
              <td className="entity">{item["action"]}</td>
              <td className="entity">
                <Link to={"/" + item["entity_name"]} target="_blank">
                  {item["entity_name"]}
                </Link>
              </td>
              <td className="value">{item["price"]}</td>
              {/* <td className="value">{timeConverter(parseInt(item["time"]))}</td> */}
              <td className="value">{item["time"]}</td>
            </tr>
          ))}
        {jsonData.length === 0 && <p>No Transactions so far</p>}
      </tbody>
    </table>
  );
}

export default TransactionTable;
