const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/PareHome");
const Schema = mongoose.Schema;

var roomSchema = new Schema({
     firstName: String,
     lastName: String,
     phoneNumber: Number,
     emailAddress: String,
 
     name: String,
     room_id: Number,
     total_occupancy: Number,
     total_bedrooms: Number,
     total_bathrooms: Number,
     description: String,
 
     addressExactAddress: String,
     addressStreet: String,
     addressCity: String,
     addressRegion: String,
     addressCountry: String,
     addressPostalCode: String,
     addressNearestLandmark: String,
 
     has_tv: Boolean,
     has_kitchen: Boolean,
     has_ac: Boolean,
     has_internet: Boolean,
     price: Number,
     owner_id: String,
     latitude: Number,
     longitude: Number,
     embeddedLink: String,
     images: []
});

const Room = mongoose.model("room", roomSchema);

module.exports = Room;