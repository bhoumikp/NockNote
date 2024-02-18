const mongoose = require("mongoose")
const connectToMongo = ()=>{
    const mongoURI = process.env.MONGO_URL;
    mongoose.connect(mongoURI , ()=>{
        console.log("Connected Succesfully")
    })
}
module.exports = connectToMongo;