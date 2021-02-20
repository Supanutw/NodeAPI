module.exports = app => {
    const _produce = require("../controllers/producer.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/send", _produce.producer);

    app.use("/api", router);
};