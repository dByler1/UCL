
const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;


const BusinessSchema = new Schema({
    business_name: {
        type: String,
        allowedNull: false,
        // validate: {
        //     len: [1]
        // }
    },
    service_category: {
        type: String,
        allowedNull: false
    },
    
    address_street: {
        type: String,
    },
    address_city: {
        type: String,
    },
    address_state: {
        type: String,
    },
    address_zip: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    service_counties: {
        type: String,
    },
    value_prop: {
        type: String,
    },
    users: [
        {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
    ]
    
});

// This creates our model from the above schema, using mongoose's model method
const Business = mongoose.model("Business", BusinessSchema);


// Export the Business model
module.exports = Business;


//https://stackoverflow.com/questions/46631906/how-to-upload-save-and-show-pictures-with-mongoose-express-angular-4-and-nodejs

