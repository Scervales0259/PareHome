const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/PareHome");
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