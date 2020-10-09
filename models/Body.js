const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bodySchema = new Schema({
    name: {type: String, },
    bones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bone"
    }],
    muscles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Muscle"
    }],
    dob: Date,
    gender: String,
    doctor: String,
},{timestamps: true});

const Body = mongoose.model("Body", bodySchema);
module.exports = Body;