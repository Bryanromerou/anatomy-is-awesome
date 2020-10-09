const express =require("express");
const app = express();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const morgan = require('morgan');

require("dotenv").config();
const PORT = process.env.PORT || 4000;
const ctrl = require("./controllers");

//-------Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.use(express.static("public"));
app.use(morgan(':method :url'));

app.get("/",(req, res)=>{
    res.send("<h1>Working</h1>")
});

app.use("/bodies",ctrl.bodies);
app.use("/bones",ctrl.bones);
app.use("/muscles",ctrl.muscles);



// 404 Route
app.use('*', (req, res) => {
    res.render('404');
  });


// ------------------ LISTEN
app.listen(PORT,()=>{
    console.log(`Now listening to port: ${PORT}`);
});