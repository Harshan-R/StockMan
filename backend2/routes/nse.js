var express = require("express");
const fetch = require("node-fetch");
var NSEAPI = require("./nse/index");
const PORT = process.env.PORT || 3000;
const axios = require("axios");
var app = express.Router();
const API_KEY = "43KOWBGYEDGS7TYK";
const { NseIndia } = require("stock-nse-india");
const nseIndia = new NseIndia();
const NseNameList = require("./nseNameList");

app.get("/list", async (req, res) => {
    let list = NseNameList.map(x => {
      return {
        type : "nse",
        name : x,
        symbol : x,
        change_24h : {
          percent : -1
        }
      }
    })
    res.send({data : list});
});

app.get("/trending", (req, res) => {
  axios
    .get(
      "https://www1.nseindia.com/live_market/dynaContent/live_analysis/most_active/allTopVolume1.json?count=25"
    )
    .then((response) => {
      let data = response.data;
      let arr = data.map((stock) => {
        return {
          symbol: stock.symbol,
          name: stock.symbol,
          price: ltp,
          change_24h: (stock.netPrice * 100) / stock.previousPrice,
        };
      });
      res.send(arr);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/:key", async (req, res) => {
  let symbol = req.params.key.toUpperCase() + ".NS";
  axios
    .get(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`)
    .then((response) => {
      const data = response.data.quoteResponse.result[0];
      const output = {
        symbol: data.symbol,
        name: data.longName,
        price: data.regularMarketPrice,
        change_24h:{
          percent : data.regularMarketChangePercent
        },
      };
      res.send(output);
    })
    .catch((error) => {
      res.send(`Error fetching data for symbol ${symbol}: ${error.message}`);
    });
});

app.get("/:key/chart", async (req, res) => {
  const symbol = req.params.key.toUpperCase() + ".NS";
  const range = "1mo";

  axios
    .get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?region=IN&lang=en-IN&includePrePost=false&interval=1d&range=${range}&corsDomain=in.finance.yahoo.com&.tsrc=finance`
    )
    .then((response) => {
      const chartData = response.data.chart.result[0];
      const {
        timestamp,
        indicators: { quote },
      } = chartData;
      const close = quote[0].close;
      const volume = quote[0].volume;
      res.send({ close, timestamp });
    })
    .catch((error) => {
      console.log(`Error retrieving data: ${error.message}`);
    });
});

module.exports = app;
