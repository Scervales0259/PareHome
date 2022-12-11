const Room = require('../model/room');
const Review = require('../model/review');
const User = require('../model/user');

const imageUploader = require('../controller/imageUploader');

const listingRegistration = (req, res) => {
     console.log("ROUTE: /listing-registration");
     res.render('listingRegistration', {isSession: true, id: sessionId});
     console.log('GO TO : Listing Registration Page');
};

const addListing = (req, res) => {
     console.log("ROUTE: /addListing");
     res.render("listingRegistration", {isSession: req.session.isLoggedIn, id: req.session.sessionId});
};

const listingPage = (req, res) => {
     var listingId = req.params.id;
     console.log("GO TO: Listing Page with ID :"+ listingId);

     Room.find({_id: new Object(listingId)}, function(err, result) {
          User.find({_id: new Object(result[0].owner_id)},   function(err, users) {
               Review.find({room_id: new Object(listingId)}, function(err,reviews){
                    if (err) throw err;
                         res.render("listing", {id: req.session.sessionId, isSession: req.session.isLoggedIn, property: result[0], user:users[0],
                                   review: reviews});
               });
          });
     });
};

const deleteListing = (req, res) => {
     var id = req.params.id;
      Room.remove({_id: new Object(id)}, function(err, res) {
          if (err) throw err;
           User.find({_id: new Object(sessionId) },  function(err, result) {
               if(err) {
                    console.log(err);
               } else {
                    console.log("GO TO: Profile Page");
                    console.log("sessionId: " + sessionId);
                    console.log("firstName: "+result[0].firstName);
                    console.log("lastName: "+result[0].lastName);
                    console.log("user_name: "+result[0].user_name);
                    console.log("password: "+result[0].password);
                    console.log("email: "+result[0].email);
                    console.log("phone_number: "+result[0].phone_number);
                    console.log("description: "+result[0].description);
                    // console.table(result);

                     Room.find({owner_id: result[0]._id.toString()}, function(err, rooms){
                         if(err) {
                         console.log(err);
                         } else {
                         response.render("profile", { isSession: true, id: sessionId, user: result[0], properties: rooms});
                         }
                    });
               }
          });
     });
};

const submitReview =  (req, res) => {
     var room_ids = req.params.id;
 
      User.findById(req.session.sessionId, function(err, user){
         var review = new Review({
             room_id: room_ids,
             user_id: req.session.sessionId,
             comment: req.body.review,
             
             firstName: user.firstName,
             lastName: user.lastName,
             profilePicture: user.profilePicture,
             username: user.user_name,
         });
 
          review.save(function(err) {
             if (err) throw err;
             res.redirect("/listingPage/"+room_ids);
         });
     });
};

module.exports = {
     listingRegistration,
     addListing,
     listingPage,
     deleteListing,
     submitReview,
};
