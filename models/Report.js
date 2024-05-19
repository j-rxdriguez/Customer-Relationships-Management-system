const mongoose = require('mongoose');


const Report = new mongoose.Schema({
    title: String,
    notes: String,
    location: String,
    date:   {
        type:Date,
        default:Date.now
    }

});


module.exports = mongoose.model("Report", Report);
