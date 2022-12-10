const multer = require('multer');

var imagePath = [];

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log('multer reached destination');
        cb(null, '../model/uploads/');
    },

    filename: function(req, file, cb) {
        console.log("Image Uploaded ", req.imageName);
        req.imageName = new Date().toISOString().replace(/:/g, '-') + file.originalname;
        imagePath.push(req.imageName);
        cb(null, req.imageName);
    }
});

var upload = multer({ storage: storage });

const clearImagePath = () => {
    this.imagePath = [];
};

module.exports = {
    upload, 
    imagePath,
    clearImagePath,
};
