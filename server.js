const express =require("express");
const app = express();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//-------Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.use(express.static("public"));

app.get("/",(req, res)=>{
    res.send("<h1>Working</h1>")
});

app.listen(PORT,()=>{
    console.log(`Now listening to port: ${PORT}`);
})