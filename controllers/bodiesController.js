
const express = require("express");
const router = express.Router();
const app = express();

const db = require("../models");

//---------------Index-----------------//
router.get("/",(req, res)=>{
    db.Body.find({},(err, allBodies)=>{
        if(err) return console.log(err);
        res.render("bodies/index",{
            bodies: allBodies
        });
    })
});

//---------------New-----------------//
router.get("/new",(req, res)=>{
    res.render("bodies/new");
});

//---------------Create-----------------//
router.post("/",(req,res)=>{
    console.log(req.body)
    db.Body.create(req.body,(err,newBody)=>{
        if(err) return console.log(err);
        res.redirect(`/bodies/${newBody._id}`)
    });
});

//---------------Show-----------------//
router.get("/:bodyId",(req, res)=>{
    db.Body.findById(req.params.bodyId, (err, foundBody)=>{
        res.render("bodies/show",{
            body: foundBody,
        });
    });
});

//---------------Edit-----------------//
router.get("/:bodyId/edit", (req, res)=>{
    db.Body.findById(req.params.bodyId,(err,editedBody)=>{
        if(err) return console.log(err);
        res.render("bodies/edit",{
            body: editedBody,
        });
    });
});

//---------------Update-----------------//
router.put("/:bodyId",(req,res)=>{
    db.Body.findByIdAndUpdate(req.params.bodyId,{$set:{
        name: req.body.name,
    }},{new:true},(err,newBody)=>{
        if(err) return console.log(err);
        res.redirect(`/bodies/${newBody._id}`)
    });
});

// ---------------Destroy-----------------//
router.delete("/:bodyId",(req,res)=>{
    db.Body.findByIdAndRemove(req.params.bodyId,(err,restOfProperties)=>{
        if(err)
        console.log(`You've got an error: ${err}`);
        res.redirect(`/bodies`);

    })
});


//This is the route to see the body part zoomed in
router.get("/:bodyId/:bodyPart",(req, res)=>{

    db.Body.findById(req.params.bodyId, (err, foundBody)=>{
        const muscles = foundBody.allMuscles;
        const remainingMuscles = [];
        const displayedMuscles = [];

        for(i = 0 ; i < muscles.length; i++){
            if(muscles[i].bodyPart == req.params.bodyPart){
                if(muscles[i].visable != true) remainingMuscles.push(muscles[i].name);//KEEP IN MIND I ONLY PASSED NAME AS STRING
                else displayedMuscles.push(muscles[i].name);
            }
        };

        console.log(remainingMuscles);

        db.Note.find({bodyPart:req.params.bodyPart, user: foundBody._id},(err,allNotesFound)=>{
                res.render("bodies/zoomed",{
                    body: foundBody,
                    bodyPart: req.params.bodyPart,
                    muscles: remainingMuscles,
                    displayedMuscles: displayedMuscles,
                    notes: allNotesFound,
                });
        });
    });
});


router.put("/:bodyId/:bodyPart",(req, res)=>{
    db.Body.findById(req.params.bodyId,(err,foundBody)=>{
        if (err) return console.log(`You've got an error: ${err}`);
        
        for(i=0;i<foundBody.allMuscles.length;i++){
            if(req.body.currentMuscle == foundBody.allMuscles[i].name){
                foundBody.allMuscles.splice(i,1,{name:`${foundBody.allMuscles[i].name}`, bodyPart:`${foundBody.allMuscles[i].bodyPart}`, visable:true});
            }
        }

        foundBody.save((err,savedBody)=>{
            if (err) return console.log(`You've got an error: ${err}`);
            res.redirect(`/bodies/${req.params.bodyId}/${req.params.bodyPart}`);
        });
    });
});


router.post("/:bodyId/:bodyPart",(req, res)=>{
    db.Note.create(req.body,(err,newNote)=>{
        if(err) return console.log(err);

        db.Body.findById(req.params.bodyId,(err,foundBody)=>{
            if(err) return console.log(err);

            foundBody.notes.push(newNote._id);
            foundBody.save((err, savedBody) => {
                if (err) return console.log(err);
                
                newNote.user = savedBody._id;
                newNote.save((err, savedNote)=>{
                    if (err) return console.log(err);

                    res.redirect(`/bodies/${req.params.bodyId}/${req.params.bodyPart}`);
                });
            });
        });
    });
});

module.exports = router;