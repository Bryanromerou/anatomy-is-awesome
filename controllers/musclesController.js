const express = require("express");
const router = express.Router();

const db = require("../models");

//---------------Index-----------------//
router.get("/",(req, res)=>{
    res.render("muscles/index");
});

//---------------New-----------------//
//---------------Create-----------------//
//---------------Show-----------------//
//---------------Edit-----------------//
//---------------Update-----------------//
//---------------Destroy-----------------//

module.exports = router;