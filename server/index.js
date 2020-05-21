const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require('./api')

const app = express();

mongoose.connect("mongodb://localhost/data-db", {useUnifiedTopology: true, useNewUrlParser: true});

app.use(bodyParser.json());

app.use("/api", router);

app.listen(4000, () => {
    console.log("Server is listening")

})


