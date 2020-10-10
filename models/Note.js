const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title:{
        type: String,
        default: "Notepad"
    },
    text:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Body"
    },
    muscle:{
        type: String,
    }
},{timestamps: true});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;