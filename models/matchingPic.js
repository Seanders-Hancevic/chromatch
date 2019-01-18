const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TweetSchema object
const picSchema = new Schema({
    id: {
        type: String
    },
    color: {
        type: String
    },
    height: {
        type: Number
    },
    width: {
        type: Number
    },
    likes: {
        type: Number
    }
});

// This creates our model from the above schema, using Mongoose's model method
var matchingPic = mongoose.model('matchingPic', picSchema);

// Export the Tweet model
module.exports = matchingPic;