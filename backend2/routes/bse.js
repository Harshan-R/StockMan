const fetch = require("node-fetch");
var express = require("express");
var BSEAPI = require('./bse/index');
const cheerio = require('cheerio');
const BseNameList = require("./bseNameList");

const PORT = process.env.PORT || 3000;
var app = express.Router();
const API_KEY = "43KOWBGYEDGS7TYK";

// not working
app.get("/list", async(req, res) => {
  let values = Object.entries(BseNameList);
  values = values.map(x => {
    return {
      type : "bse",
      name : x[1].companyName,
      symbol: x[0],
      change_24h : {
        percent : -1
      }
    }
  });
  res.send(values);
});

app.get("/:key", async(req, res) => {
  const symbol = req.params.key.replace(/\s/g, "");
  fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.BSE&apikey=${API_KEY}`)
  .then(data => data.json())
  .then(data => {
    data = data["Global Quote"];
    res.send({
      symbol: data["01. symbol"],
      price: data["05. price"],
      change_24h : {percent : data["10. change percent"]}
    })
  })
});

app.get("/:key/chart", async(req, res) => {
  const symbol = req.params.key; // Example symbol
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}.BSE&apikey=${API_KEY}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const monthlyData = data['Monthly Time Series'];
      const prices = [];
      for (const date in monthlyData) {
        const priceData = monthlyData[date];
        prices.push({ date, price: priceData['4. close'] });
      }
      // console.log(prices);
      res.send(prices);
    })
    .catch(error => {
      res.send(error);
      // console.error(`Fetch error: ${error}`);
    });
});


// not found
app.get("/trending", async (req, res) => {

});

module.exports = app;