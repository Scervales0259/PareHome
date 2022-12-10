const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/PareHome");
const Schema = mongoose.Schema;

var reviewSchema = new Schema({
     room_id: String,
     user_id: String,
     rating: Number,
     comment: String,
 
     firstName: String,
     lastName: String,
     profilePicture: String,
     username: String,
});

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;