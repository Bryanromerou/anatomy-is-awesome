const e = require("express");
const express = require("express");
const router = express.Router();

const db = require("../models");


//---------------Index-----------------//

router.get('/', (req, res) => {
    
    
    res.render('notes/index');

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
router.get('/:noteId', (req, res) => {
    db.Note.findById(req.params.noteId, (err, foundNotes) => {
        if(err) return console.log(err);
        res.render('notes/show', {
            note: foundNotes,
        });
    })
})

//---------------Edit------------------//

//---------------Update----------------//

//---------------Destroy---------------//

module.exports = router;