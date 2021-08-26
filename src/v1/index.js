const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});

module.exports = router;