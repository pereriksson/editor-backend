"use strict";

require('dotenv-flow').config()
const {PORT} = require("./constants.js");
const createServer = require("./server");

const run = async () => {
    const app = await createServer();

    app.listen(PORT, () => {
        console.info(`Server is listening on port ${PORT}.`);
    });
}

run();