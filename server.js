// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require('multer');
const mongoose = require("mongoose");
const { request } = require("http");
const bcrypt = require('bcrypt');
const { application, response } = require("express");
const { error } = require("console");
const session = require('express-session');
const saltRounds = 10;
require('dotenv').config();

const app = express();

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

var imagePath = []; 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'model/uploads/');
    },

    filename: function(req, file, cb) {
        req.imageName = new Date().toISOString().replace(/:/g, '-') + file.originalname;
        imagePath.push(req.imageName);
        console.log("Image Uploaded", req.imageName);
        cb(null, req.imageName);
    }
});

var upload = multer({ storage: storage });
 
app.use("/uploads", express.static(__dirname + "/model/uploads"));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}));

const listingRoutes = require('./routes/listingRoutes');
const homeRoutes = require('./routes/homeRoutes');
const loginRoutes = require('./routes/loginRoutes');

app.use(homeRoutes);
app.use(loginRoutes);
app.use(listingRoutes);

const Room = require('./model/room');
const Review = require('./model/review');
const User = require('./model/user');

// Submit Sign Up
app.post('/signup_submit', upload.array('profilePicture'), (req, res) => {
    console.log("ROUTE: /signup_submit");
    
    User.exists({username:'Gourav'}, function (err, doc) {
        if (err){
            console.log(err)
        }else{
            console.log("Result :", doc) // false
        }
    });

    // upload.array('bannerPicture');
    bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
        const user = new User({
            firstName: (req.body.firstName).toLowerCase(),
            lastName: (req.body.lastName).toLowerCase(),
            phone_number: req.body.phone_number,
            email: (req.body.email).toLowerCase(),
            description: (req.body.description),
            user_name: (req.body.username).toLowerCase(),
            password: hash,
            addressFull: (req.body.addressFull),
            addressStreet: (req.body.addressStreet),
            addressCity: (req.body.addressCity),
            addressRegion: (req.body.addressRegion),
            addressCountry: (req.body.addressCountry),
            profilePicture: "uploads/"+imagePath[0],
            // bannerPicture: "uploads/"+imagePath[1],
        });
    
        user.save(function(err) {
            if (err) {
                console.log(err);
                console.log("Sign Up Failed");
            } else {
                res.render('index', {isSession: req.session.isLoggedIn, id: req.session.sessionId});
                console.log("Sign Up Success");
                console.table(imagePath);
                imagePath = [];
            }
        });
    });
});

app.post("/uploadListing", upload.array('images'), function (req, response) {
    for(var i = 0; i < imagePath.length; i++) {
        imagePath[i] = "uploads/" + imagePath[i];
        console.log(imagePath[i]);
    }
    console.log("ROUTE: /uploadListing");
    const room = new Room({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress,

        name: req.body.name,
        room_id: req.body.id,
        home_type: req.body.home_type,
        room_type: req.body.room_type,
        total_occupancy: req.body.total_occupancy,
        total_bedrooms: req.body.total_bedrooms,
        total_bathrooms: req.body.total_bathrooms,
        description: req.body.summary,

        addressExactAddress: req.body.addressExactAddress,
        addressStreet: req.body.addressStreet,
        addressCity: req.body.addressCity,
        addressRegion: req.body.addressRegion,
        addressCountry: req.body.addressCountry,
        addressPostalCode: req.body.addressPostalCode,
        addressNearestLandmark: req.body.addressNearestLandmark,

        has_tv: req.body.has_tv,
        has_kitchen: req.body.has_kitchen,
        has_internet: req.body.has_internet,
        price: req.body.price,
        owner_id: req.session.sessionId,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        embeddedLink: req.body.embeddedLink,

        images: imagePath,
    });

    room.save(function(err) {
        imagePath = [];
        console.log("Length of imagePath: " + imagePath.length);
        if (err) throw err;
        response.redirect("/profile/"+req.session.sessionId);
        console.log("Listing Registration Success");
    });
});

// app.post("/editListing", upload.array('images'), function (req, response) {
//     var listingIds = req.body.listingId;
//     for(var i = 0; i < imagePath.length; i++) {
//         imagePath[i] = "uploads/" + imagePath[i];
//         console.log(imagePath[i]);
//     }
//     console.log("Listing ID: "+listingIds);

//     Room.findOneAndUpdate({_id: new Object(listingIds)},{
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         phoneNumber: req.body.phoneNumber,
//         emailAddress: req.body.emailAddress,

//         name: req.body.name,
//         room_id: req.body.id,
//         home_type: req.body.home_type,
//         room_type: req.body.room_type,
//         total_occupancy: req.body.total_occupancy,
//         total_bedrooms: req.body.total_bedrooms,
//         total_bathrooms: req.body.total_bathrooms,
//         summary: req.body.summary,

//         addressExactAddress: req.body.addressExactAddress,
//         addressStreet: req.body.addressStreet,
//         addressCity: req.body.addressCity,
//         addressRegion: req.body.addressRegion,
//         addressCountry: req.body.addressCountry,
//         addressPostalCode: req.body.addressPostalCode,
//         addressNearestLandmark: req.body.addressNearestLandmark,

//         has_tv: req.body.has_tv,
//         has_kitchen: req.body.has_kitchen,
//         has_internet: req.body.has_internet,
//         price: req.body.price,
//         owner_id: sessionId,
//         latitude: req.body.latitude,
//         longitude: req.body.longitude,
//         embeddedLink: req.body.embeddedLink,

//         images: imagePath,
//     });
//     imagePath = [];
//     response.redirect("/profile/"+sessionId);
// });

// app.get("/editListing/:id", function(req, res){
//     Room.find({_id: new Object(req.params.id)}, function(err,result){
//         if (err) throw err;
//         res.render("editListing", {isSession: true, id: sessionId, listing: result[0] });
//     });
// });

// Listening Port
app.listen(3000, function() {
     console.log("Listening on port 3000");
 });

