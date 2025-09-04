// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

// const userSchema = new Schema({
//     email:{
//         type: String,
//         required: true
//     },
// });


// userSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model('User', userSchema);
 const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
       username: {
        type: String,
       required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    googleId: String // Add this line for the Google ID
});
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model("User", userSchema);