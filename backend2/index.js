// API Key : 43KOWBGYEDGS7TYK
// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=RELIANCE.BSE&apikey=43KOWBGYEDGS7TYK
// https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=full&apikey=demo
// 27140057866-2qettfcfdgng7hif66rnflkgo7bhgm37.apps.googleusercontent.com

// Import required packages
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv");
var cors = require('cors');
// const auth_router = require("./routes/auth");
const crypto_router = require("./routes/crypto");
const nse_router = require("./routes/nse");
const bse_router = require("./routes/bse");
const user_router = require("./routes/user");

dotenv.config();
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// app.use("/auth", auth_router);
app.use("/crypto", crypto_router);
app.use("/nse", nse_router);
app.use("/bse", bse_router);
app.use("/user", user_router)

app.listen(8001, () => {
  console.log("Server started on port 8001 http://localhost:8001");
});
