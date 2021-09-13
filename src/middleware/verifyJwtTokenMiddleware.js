const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../constants");

let verifyJwtTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.payload = payload;
            next();
        });
    } else if (req.originalUrl !== '/v1/login') {
        res.sendStatus(401);
    } else {
        next();
    }
};

module.exports = verifyJwtTokenMiddleware;