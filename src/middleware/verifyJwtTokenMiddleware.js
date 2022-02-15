const express = require("express");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../constants");
const url = require("url");

const app = express();

let verifyJwtTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const safeAnonymousRoutes = [
        "/v1/login",
        "/v1/register",
        "/v1/acceptInvitation",
        "/socket.io/"
    ];

    const reqUrl = url.parse(req.url);

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.payload = payload;
            next();
        });
    } else if (safeAnonymousRoutes.includes(reqUrl.pathname)) {
        next();
    } else {
        res.sendStatus(401);
    }
};

module.exports = verifyJwtTokenMiddleware;