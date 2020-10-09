const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bodySchema = new Schema({
    name: {type: String, required: true},
},{timestamps: true});

const Body = mongoose.model("Body", bodySchema);
module.exports = Body;