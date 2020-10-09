const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muscleSchema = new Schema({
    name: {type: String, required: true},
    body: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Body",
    },
    // bones:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Muscle"
    // },
},{timestamps: true});

const Muscle = mongoose.model("Muscle", muscleSchema);
module.exports = Muscle;