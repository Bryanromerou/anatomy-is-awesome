const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boneSchema = new Schema({
    name: {type: String, required: true},
},{timestamps: true});

const Bone = mongoose.model("Bone", boneSchema);
module.exports = Bone;