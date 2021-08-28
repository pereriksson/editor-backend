"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const v1 = require("./v1/index.js");
const cors = require("cors");
const {PORT} = require("./constants.js");
const DBClient = require("./apis/DBClient.js");

const app = express();
const router = express.Router();

app.set("db", new DBClient());
app.use(cors());
app.use(bodyParser.json());
app.use("/v1", v1);

app.listen(PORT, () => {
    console.info(`Server is listening on port ${PORT}.`);
});