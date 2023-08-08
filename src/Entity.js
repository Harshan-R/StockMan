import "./css/skills.css";
import nseDefaultLogo from "./nseoer.png"
import bseDefaultLogo from "./bse.jpg"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Entity({imageURL, price, name, percentChange, type, symbol}) {
    const url = `${type}/${name}`;
    const [_price, setPrice] = useState(price);
    const [_percentChange, setPercentageChange] = useState(percentChange);

    // useEffect(() => {
    //     if(type === "nse"){
    //         fetch(`http://localhost:8001/nse/${name}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //           setPrice(data.price)
    //           setPercentageChange(data.change_24h.percent)
    //         })
    //     }
    // }, [])
    

    return (
        <>
            <Link to={url} target="_blank" rel="noopener noreferrer">
                <div className="card">
                    <center>
                        {type === "crypto" && <img src={imageURL} width="70" height="70" alt={name} />}
                        {type === "nse" && <img src={nseDefaultLogo} width="70" height="70" alt={name} />}
                        {type === "bse" && <img src={bseDefaultLogo} width="70" height="70" alt={name} />}
                        <div className="h3">{name}</div>
                        {price && <div className="p">₹ {price}</div>}
                        {percentChange && (percentChange != -1) && <div className="p percent" >{percentChange}%</div>}
                    </center>
                </div>
            </Link>
        </>
    );
}

export default Entity;
