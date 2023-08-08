const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
var app = express.Router();

app.use(bodyParser.json());

app.get("/list", async (req, res) => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr";
    fetch(url).then(res => res.json())
    .then(data => {
        let list = data.map(x => {
            return {
                type: "crypto",
                name : x["id"],
                symbol : x["symbol"],
                img : x["image"],
                price : x["current_price"],
                change_24h : {
                    high : x["high_24h"],
                    low : x["low_24h"],
                    percent : x["price_change_percentage_24h"]
                }
            }
        })
        res.json({
            data : list
        })
    })
    .catch(error => console.error(error));
});

app.get("/trending", async (req, res) => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=gecko_desc&per_page=25&page=1&sparkline=false&price_change_percentage=24h";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        let coins = data.map(x => {
            return {
                name : x.name,
                symbol : x.symbol,
                img : x.image,
                change_24 :{
                    high : x["high_24h"],
                    low : x["low_24h"],
                    percent : x["price_change_percentage_24h"]
                },
                price : x.current_price
            }
        });
        res.send(coins);
    })
})

app.get("/:key", async (req, res) => {
    console.log("receiver key request")
    const url = `https://api.coingecko.com/api/v3/coins/${req.params.key}`;
    fetch(url).then(data => data.json())
    .then(data => {
        res.json({
            name : data["name"],
            symbol : data["id"],
            short_name : data["symbol"].toUpperCase(),
            price : data["market_data"]["current_price"]["inr"],
            img : data["image"]["large"],
            change_24h : {
                high : data["market_data"]["high_24h"]["inr"] ,
                low : data["market_data"]["low_24h"]["inr"],
                percent : data["market_data"]["price_change_percentage_24h_in_currency"]["inr"]
            }
        })
    })
});

app.get("/:key/chart", async (req, res) => {
    const url = `https://api.coingecko.com/api/v3/coins/${req.params.key}/market_chart?vs_currency=inr&days=30`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let prices = data.prices;
        prices = prices.map((x) => {
            var date = new Date(x[0] * 1000);
            return {
                time : x[0],
                price : x[1]
            }
        });
        res.send({
            data : prices
        });
      })
      .catch(error => console.error(error));
});


module.exports = app;