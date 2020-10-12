const e = require("express");
const express = require("express");
const router = express.Router();

const db = require("../models");


//---------------Index-----------------//

router.get('/', (req, res) => {
    db.Note.find({}, (err, allNotes) => {
    
        if(err) return console.log(err);
        res.render('notes/index', {
            notes: allNotes,
        });
    });
    
    

});

//---------------New-------------------//
router.get('/new', (req, res) => {
    
    res.render('notes/new');
});
//--------------Create----------------//
router.post('/', (req, res) => {

    db.Note.create(req.body,(err, newNotes)=> {
        if(err) return console.log(err);
        res.redirect(`/notes/${newNotes._id}`)
    });
});

//---------------Show------------------//
router.get("/:noteId", (req, res) => {
    db.Note.findById(req.params.noteId, (err, foundNotes) => {
        if(err) return console.log(err);
        res.render('notes/show', {
            note: foundNotes,
        });
    })
})

//---------------Edit------------------//
router.get("/:noteId/edit", (req, res) => {
    db.Note.findById(req.params.noteId, (err, editNote) => {
        if (err) return console.log(err);
        res.render("notes/edit", {
            note: editNote,
        });

    });
});
//---------------Update----------------//
router.put("/:noteId", (req, res) => {
    db.Note.findByIdAndUpdate(req.params.noteId, {$set:
        {
            title: req.body.title,
        }},{new:true},(err,newNote)=>{
        if(err) return console.log(err);
        res.redirect(`/notes/${newNote._id}`)
});
});
//---------------Destroy---------------//

module.exports = router;