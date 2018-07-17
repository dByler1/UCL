const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password: {
        type: String,
        trim: true,
        //required: "Password is Required",
        validate: [
          function(input) {
            return input.length >= 6;
          },
          "Password should be longer."
        ]
      },
      // `email` must be of type String
      // `email` must be unique
      // `email` must match the regex pattern below and throws a custom error message if it does not
      // You can read more about RegEx Patterns here https://www.regexbuddy.com/regex.html
      email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
      },
      // `date` must be of type Date. The default value is the current date
      userCreated: {
        type: Date,
        default: Date.now
      }
});

UserSchema.plugin(passportLocalMongoose, {usernameField: "email"});

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", UserSchema);

// Export the User model
module.exports = User;


