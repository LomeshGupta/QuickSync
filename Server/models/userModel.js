var mongoose = require("mongoose");

var userSchema = mongoose.Schema; 

var userDetail = new userSchema({
    username :{
        type : String,
        require : [true,"Please add a username"],
        unique : true,
        trim : true
    },
    fullname : {
        type: String,
        require : [true,"Please add full name"]
    },
    email :{
        type : String,
        require : [true, "Please add your email id"],
        trim : true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please Enter a valid email"
        ]
    },
    password : {
        type : String,
        require : [true, "Please add a password"],
        minLength : [6, "Password must be minimum 6 character long"],
        match : [
            /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        ]
    },
    designation :{
        type : String,
        require : [true, "Please add a Designation"]
    },
    department :{
        type : String,
        require : [true, "Please add a Department"]
    },
    employed :{
        type : Date,
        require : [true, "Please add a Employment Date"]
    },
    photo:{
        type : Object,
        require : [false, "Please add a photo"],
        default : {}
    },
    phone:{
        type : String,
        require : [true, "Please add a phone"]
    }
},{
    timestamps : true
})
const User = mongoose.model("User",userDetail);
module.exports = User;