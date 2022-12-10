const Room = require('../model/room');
const Review = require('../model/review');
const User = require('../model/user');

const home = (req, res) => {
     console.log("ROUTE: /index");
     res.render('index', {isSession: req.session.isLoggedIn, id: req.session.sessionId});
     console.log('GO TO : Home Page');
};

const login = (req, res) => {
     req.session.sessionId = 0;
     req.session.isLoggedIn = false;
     
     console.log("ROUTE: /login");
     res.render('login', {isSession: false, id: 0, isCorrectCredentials: true});
     console.log('GO TO : Log In Page');
};

const signup = (req, res) => {
     req.session.sessionId = 0;
     req.session.isLoggedIn = false;
     console.log("ROUTE: /signup");
     res.render('signup', {isSession: false, id: 0});
     console.log('GO TO : Sign-Up Page');
};

const properties = (req, res) => {
     console.log("ROUTE: /properties");
     console.log('GO TO : Properties Page');
 
     Room.find({}, function(err,result){
         if(result.length === 0) {
             res.render("properties", {isSession: req.session.isLoggedIn, id: req.session.sessionId, properties: []});
             console.log("No Existing Properties");
         } else { 
             res.render("properties", {isSession: req.session.isLoggedIn, id: req.session.sessionId, properties: result});
             console.log("There are existing properties");
             console.log("Result length: " + result.length);
         }
     });
};

const logout = (req, res) => {
     console.log("ROUTE: /logout");
     req.session.isLoggedIn = false;
     req.session.sessionId = 0;
     res.render('index', { isSession: false });
     console.log("Logout: SUCCESS");
 }

const profile = (req, res) => {
     console.log("ROUTE: /profile/:id");
     User.findById(req.session.sessionId , function(err, result) {
         if(err) {
             console.log(err);
         } else {
             console.log("GO TO: Profile Page");
             console.log("sessionId: " + req.session.sessionId);
             console.log("firstName: "+result.firstName);
             console.log("lastName: "+result.lastName);
             console.log("user_name: "+result.user_name);
             console.log("password: "+result.password);
             console.log("email: "+result.email);
             console.log("phone_number: "+result.phone_number);
             console.log("description: "+result.description);
             console.log("profile picture: "+result.profilePicture);
             // console.table(result);
 
             Room.find({owner_id: (req.session.sessionId)}, function(err, rooms){
                 if(err) {
                     console.log(err);
                 } else {
                     res.render("profile", { isSession: req.session.isLoggedIn, id: req.session.sessionId, user: result, properties: rooms});
                 }
             });
         }
     });
}

module.exports = {
     home,
     login,
     signup,
     properties,
     logout,
     profile,
};