const mongoose = require("mongoose");

// Connection with MongoDB
mongoose.connect("mongodb://localhost:27017/Todo").then(() =>{
    console.log('Connected to MongoDB');
}).catch((error) =>
console.log(error));

// Create Schema
const TaskSchema = new mongoose.Schema({
    Name: {type : String },
    Date: { type: Date ,default:Date.now()},
});


module.exports = mongoose.model("Store",TaskSchema);
