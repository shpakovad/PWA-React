const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    idText: Number,
    text: String
});

const Data = mongoose.model("data", DataSchema)
module.exports = Data
