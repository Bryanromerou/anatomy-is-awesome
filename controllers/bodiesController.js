const express = require("express");
const router = express.Router();

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
        dob: req.body.dob,
        gender: req.body.gender,
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
        for(i = 0 ; i < muscles.length; i++){
            if(muscles[i].bodyPart == req.params.bodyPart){
                if(muscles[i].visable == false) remainingMuscles.push(muscles[i].name);//KEEP IN MIND I ONLY PASSED NAME AS STRING
            }
        };
        console.log(remainingMuscles);

        res.render("bodies/zoomed",{
            body: foundBody,
            bodyPart: req.params.bodyPart,
            muscles: remainingMuscles,
        });
    });
});

module.exports = router;