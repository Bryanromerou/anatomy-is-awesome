const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bodySchema = new Schema({
    name: {type: String, },
    bodyPart: {// Head Arms Legs Torso
        type: Array,
        default: ["Head","Arms","Legs","Torso"] 
    },
    bones: [{
        type: String,
    }],
    notes: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Note"
    }]
},{timestamps: true});

const Body = mongoose.model("Body", bodySchema);
module.exports = Body;