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

const listingPage = async (req, res) => {
     var listingId = req.params.id;
     console.log("GO TO: Listing Page with ID :"+ listingId);

     await Room.find({_id: new Object(listingId)}, async function(err, result) {
          await User.find({_id: new Object(result[0].owner_id)},  async function(err, users) {
               await Review.find({room_id: new Object(listingId)}, function(err,reviews){
                    if (err) throw err;
                         res.render("listing", {id: req.session.sessionId, isSession: req.session.isLoggedIn, property: result[0], user:users[0],
                                   review: reviews});
               });
          });
     });
};

const deleteListing = async (req, res) => {
     var id = req.params.id;
     await Room.remove({_id: new Object(id)}, async function(err, res) {
          if (err) throw err;
          await User.find({_id: new Object(sessionId) }, async function(err, result) {
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

                    await Room.find({owner_id: result[0]._id.toString()}, function(err, rooms){
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

// const uploadListing = (req, res) => {
//      imageUploader.upload.array('images');
//      for(var i = 0; i < imagePath.length; i++) {
//           imageUploader.imagePath[i] = "../model/uploads/" + imageUploader.imagePath[i];
//           console.log(imageUploader.imagePath[i]);
//      }
//      console.log("ROUTE: /uploadListing");
//      const room = new Room({
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,
//           phoneNumber: req.body.phoneNumber,
//           emailAddress: req.body.emailAddress,

//           name: req.body.name,
//           room_id: req.body.id,
//           home_type: req.body.home_type,
//           room_type: req.body.room_type,
//           total_occupancy: req.body.total_occupancy,
//           total_bedrooms: req.body.total_bedrooms,
//           total_bathrooms: req.body.total_bathrooms,
//           summary: req.body.summary,

//           addressExactAddress: req.body.addressExactAddress,
//           addressStreet: req.body.addressStreet,
//           addressCity: req.body.addressCity,
//           addressRegion: req.body.addressRegion,
//           addressCountry: req.body.addressCountry,
//           addressPostalCode: req.body.addressPostalCode,
//           addressNearestLandmark: req.body.addressNearestLandmark,

//           has_tv: req.body.has_tv,
//           has_kitchen: req.body.has_kitchen,
//           has_internet: req.body.has_internet,
//           price: req.body.price,
//           owner_id: sessionId,
//           latitude: req.body.latitude,
//           longitude: req.body.longitude,
//           embeddedLink: req.body.embeddedLink,

//           images: imageUploader.imagePath,
//      });

//      room.save(function(err) {
//           imageUploader.clearImagePath();
//           console.log("Length of imagePath: " + imageUploader.imagePath.length);
//           if (err) throw err;
//           response.redirect("/profile/"+req.session.sessionId);
//           console.log("Listing Registration Success");
//      });
// };

const submitReview = async (req, res) => {
     var room_ids = req.params.id;
 
     await User.findById(req.session.sessionId, async function(err, user){
         var review = new Review({
             room_id: room_ids,
             user_id: req.session.sessionId,
             comment: req.body.review,
             
             firstName: user.firstName,
             lastName: user.lastName,
             profilePicture: user.profilePicture,
             username: user.user_name,
         });
 
         await review.save(function(err) {
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
     // uploadListing,
     submitReview,
};
