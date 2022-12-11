const Room = require('../model/room');
const Review = require('../model/review');
const User = require('../model/user');

const imageUploader = require('../controller/imageUploader');

const bcrypt = require('bcrypt');

const submit = (req, res) => {
     console.log("ROUTE: /login-submit");
     let username = (req.body.username).toLowerCase();
     let typedPassword = req.body.password;

     console.log(req.body);
 
     User.find({user_name: username}, function(err, result) {
         if(result.length === 0) {
             res.render("login", {isCorrectCredentials: false, isSession: false});
             console.log("Username or Password is incorrect");
         } else {
             const currentPassword = result[0].password;
             if(bcrypt.compareSync(typedPassword, currentPassword)) {
                 req.session.isLoggedIn = true;
                 req.session.sessionId =  result[0]._id.toString();
                 console.log("Type of sessionId: "+typeof(sessionId));
                 console.log("sessionId: " + req.session.sessionId);
                 console.log("Login: SUCCESS");
                 res.render("index", {isSession: req.session.isLoggedIn, id: req.session.sessionId});
             } else {
                 console.log("Login: FAILED");
                 res.render("login", {isCorrectCredentials: false, isSession: false});
             }
         }
     });
};

module.exports = {
     submit,
};