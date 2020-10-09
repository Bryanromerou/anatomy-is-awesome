const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muscleSchema = new Schema({
    name: {type: String, required: true},
},{timestamps: true});

const Muscle = mongoose.model("Muscle", muscleSchema);
module.exports = Muscle;