import { useState, useEffect } from "react";
import axios from "axios";

function MyTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.post("http:localhost:8001/user/get_transactions").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Action</th>
          <th>Entity Name</th>
          <th>Price</th>
          <th>Time</th>
         
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row._id}>
            <td>{row.user_name}</td>
            <td>{row.action}</td>
            <td>{row.entity_name}</td>
      
            <td>{row.price}</td>
            <td>{row.time}</td>
        
          </tr>
        ))}
      </tbody>
    </table>
  );
}