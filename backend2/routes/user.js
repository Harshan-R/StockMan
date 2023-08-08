const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
// var url = "mongodb://localhost:27017";
var url = "mongodb+srv://20i321harshan:potatopotato123@cluster0.k6scfc1.mongodb.net/stockss"
var app = express.Router();
var cors = require("cors");
const client = new MongoClient(url);
const database = client.db("stock");
const users = database.collection("users");
const holding = database.collection("holding");
const transactions = database.collection("transactions");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Working");
});

app.post("/new_user", async (req, res) => {
  let user_obj = {
    user_name: req.body.user_name ?? req.body.username,
    balance: 20000,
    holding: [],
  };
  console.log(user_obj);
  try {
    const result = await users.insertOne(user_obj);
    res.send(result);
  } catch {
    res.send("user exist");
  }
});

app.post("/delete_user", async (req, res) => {
  const user_name = req.body.user_name ?? req.body.username;
  users.deleteOne({
    user_name: user_name,
  });
  holding.deleteMany({ user_name });
  res.send(200);
});

app.post("/buy", async (req, res) => {
  console.log(req.body);
  const user_name = req.body.user_name ?? req.body.username;
  const entity_name = req.body.name;
  const count = req.body.count;
  const price = req.body.price;
  const time = Date.now();
  const type = req.body.type;
  const action = "buy";
  holding.findOneAndUpdate(
    { user_name, entity_name },
    { $inc: { count } },
    { upsert: true }
  );
  transactions.insertOne({
    user_name,
    action,
    entity_name,
    price,
    time,
    type,
    action,
  });
  res.send("OK");
});

app.post("/sell", async (req, res) => {
  console.log(req.body);
  const user_name = req.body.user_name ?? req.body.username;
  const entity_name = req.body.name;
  const count = -1 * req.body.count;
  const price = req.body.price;
  const time = Date.now();
  const type = req.body.type;
  const action = "sell";
  transactions.insertOne({
    user_name,
    action,
    entity_name,
    price,
    time,
    type,
    action,
  });
  holding.findOneAndUpdate({ user_name, entity_name }, { $inc: { count } });
  res.send("OK");
});

app.post("/get_holding", async (req, res) => {
  console.log(req.body);
  const user_name = req.body.user_name ?? req.body.username;
  const entity_name = req.body.key;
  console.log({ user_name, entity_name })
  if (!entity_name) {
    holding
      .find({ user_name })
      .toArray()
      .then((arr) => {
        res.send(
          arr.map((x) => {
            return {
              entity_name: x.entity_name,
              count: x.count,
            };
          })
        );
      })
      .catch((err) => res.send(err));
  } else {
    holding
      .find({ user_name, entity_name })
      .toArray()
      .then((arr) => {
        // console.log(arr)
        res.send({
          entity_name: arr[0]["entity_name"],
          count: arr[0]["count"],
        });
      })
      .catch((err) => res.send(err));
  }
});

app.post("/get_user", async (req, res) => {
  const user_name = req.body.user_name ?? req.body.username;
  users
    .findOne({ user_name })
    .then((arr) => {
      res.send({
        user_name: arr["user_name"],
        balance: arr["balance"],
      });
    })
    .catch((err) => res.send(err));
});

app.post("/get_transactions", async (req, res) => {
  const user_name = req.body.user_name ?? req.body.username;
  const entity_name = req.body.entity_name;
  if (entity_name == null) {
    transactions
      .find({ user_name })
      .sort({ time: -1 })
      .toArray()
      .then((arr) => {
        res.send(arr);
      })
      .catch((err) => res.send(err));
  } else {
    transactions
      .find({ user_name, entity_name })
      .sort({ time: -1 })
      .toArray()
      .then((arr) => {
        res.send(arr);
      })
      .catch((err) => res.send(err));
  }
});

app.post("/get_balance", (req, res) => {
  console.log("get balance triggered");
  console.log(req.body);
  const user_name = req.body.user_name ?? req.body.username;

  transactions
    .find({ user_name })
    .sort({ time: -1 })
    .toArray()
    .then((arr) => {
      let balance = 20000;
      for (let i of arr) {
        console.log(i)
        if (i["action"] === "buy") balance -= i["price"];
        else balance += i["price"];
      }
      res.send({ balance });
    })
    .catch((err) => res.send(err));
});

module.exports = app;
