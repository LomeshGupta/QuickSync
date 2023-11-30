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
        type : String,
        require : [true, "Please add a photo"],
        default : "https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol.png"
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