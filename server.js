const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
const User = require('./models/user');
const Business = require('./models/business');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001; 
const app = express();
// app.use(express.static("./public"));


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("express-session")({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/GeneralListingsdb");

//passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//ROUTES THAT RESPOND WITH HTML OR A PAGE
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});


//ROUTES THAT RESPOND WITH JSON OR DATA

app.post('/register', function (req, res) {
  User.register(new User({ 
    username: req.body.username, 
    password: req.body.password 
  }), req.body.password, function (err, user) {
      if (err) {
          console.log(err);
          return;
      }

      Business.create({ 
        business_name: req.body.business_name,
        service_category: req.body.service_category,
        users: [ user._id ] 
      }, function (err, business) {
        if (err) {
            console.log(err);
            return;
        }
        //console.log(business);
        passport.authenticate('local')(req, res, () => {
          res.json(req.body.business_name);
          console.log(req.body.business_name);
        });

      
      });

      
  });
  
});

app.get("/getBusinessData/:bus", function (req, res) {
  Business.findOne()
  .then(foundBusiness => res.json(foundBusiness));

})



// Send every request to the React app
// Define any API routes before this runs

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
