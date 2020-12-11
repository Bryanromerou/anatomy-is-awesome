const express =require("express");
require("dotenv").config();
const app = express();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const morgan = require('morgan');
//const layouts = require('express-ejs-layouts');

// ------ DOTENV
const PORT = process.env.PORT || 4000;
const ctrl = require("./controllers");

//-------Middleware

// BOOTSTRAP
app.use(express.static(`${__dirname}/public`));
//app.use(express.static("public"));
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
// EJS
app.set("view engine", "ejs");
// Method Override
app.use(methodOverride("_method"));
// Morgan
app.use(morgan(":method :url"));
// Express Layout
//app.use(layouts);

app.get("/",(req, res)=>{
    res.render("index");
});

app.use("/bodies",ctrl.bodies);
app.use("/notes",ctrl.notes);


// 404 Route
app.use('*', (req, res) => {
    res.render('404');
});


// ------------------ LISTEN
app.listen(PORT,()=>{
    console.log(`Now listening to port: ${PORT}`);
});