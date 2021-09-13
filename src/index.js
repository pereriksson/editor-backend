"use strict";

require('dotenv-flow').config()
const express = require("express");
const bodyParser = require("body-parser");
const v1 = require("./v1/index.js");
const cors = require("cors");
const {PORT,WEBSOCKET_CORS_HOSTNAMES} = require("./constants.js");
const DBClient = require("./apis/DBClient.js");
const http = require('http');
const verifyJwtTokenMiddleware = require("./middleware/verifyJwtTokenMiddleware");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: WEBSOCKET_CORS_HOSTNAMES,
        methods: ["GET", "POST"]
    }
});

app.set("db", new DBClient());
app.use(verifyJwtTokenMiddleware);
app.use(cors());
app.use(bodyParser.json());
app.use("/v1", v1);

io.on('connection', socket => {
    socket.on("open", room => {
        socket.join(room);
    });

    socket.on("update", data => {
        io.to(data._id).emit("update", data);
    });
});

server.listen(PORT, () => {
    console.info(`Server is listening on port ${PORT}.`);
});
