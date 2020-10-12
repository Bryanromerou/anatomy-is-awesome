const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected",()=>{
    console.log("Successfully connected to mongodb!");
});

mongoose.connection.on("error",(err)=>{
    console.log(`Oh no there has been an error: ${err}`);
});

module.exports = {
    Body: require("./Body"),
    Note: require("./Note")    
}