require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Scervales:" + process.env.ATLAS_PASSWORD + "@parehome.zthenka.mongodb.net/?retryWrites=true&w=majority");
const Schema = mongoose.Schema;

var userSchema = new Schema ({
     user_id: Number,
     firstName: String,
     lastName: String,
     user_name: { 
         type: String, 
         required: true},
     password: { 
         type: String, 
         required: true},
     email: String,
     phone_number: Number,
     description: String,
     profilePicture: String,
     bannerPicture: String,
 
     addressFull: String,
     addressStreet: String,
     addressCity: String,
     addressRegion: String,
     addressCountry: String,
 
     createdAt: String,
     updatedAt: String
});

const User = mongoose.model("user", userSchema);

module.exports = User;