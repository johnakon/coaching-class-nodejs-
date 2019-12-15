//requiring packages
const express = require ('express');
const mongoose = require('mongoose')
const path = require('path');
const bodyParser = require('body-parser')
//creating the server app
let server  = express();

console.log(__dirname);
let joinedpath = path.join(__dirname, "views");

server.set("view engine", "pug");

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.set("views", joinedpath);

server.use(express.static(path.join(__dirname, '/public')));



// connecting to the database
mongoose.connect("mongodb://localhost:27017/users", () =>{
    console.log('Connected asap')
})

//,.... then after connecting to the db, 
//we create the schema
const userSchema = new mongoose.Schema({
    firstname:{ type:String, unique : true, required : "Firstname required"},
    lastname:{ type:String, unique : true, required : "Lastname required"},
    password:{ type:String, required : "Password required"}

})

//creating the model for this schema
const userModel  = mongoose.model("user", userSchema)

// ROUTES
server.get('/registration', (req, res) => {
    res.render("forms.pug")
});

// server.post('/register', (req, res) => {
//     res.send("we are live")
// });
//get data from the form
server.post('/register', (req, res) => {
    // console.log(req.body.firstname, req.body.password);

    //creating an instance of the data entered
    let newUser = new userModel(req.body)
    newUser.save()
});

//server listening
server.listen(2000,()=>{
    console.log("server is listening..........");
});



// mongodb documentation
/*





*/