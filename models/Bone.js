const mongoose = require("mongoose");
const { muscles } = require("../controllers");
const Schema = mongoose.Schema;

const boneSchema = new Schema({
    name: {type: String, required: true},
    body: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Body",
    },
    // muscles: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Muscle"
    // }],
},{timestamps: true});

const Bone = mongoose.model("Bone", boneSchema);
module.exports = Bone;