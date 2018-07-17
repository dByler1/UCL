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
console.log(req.body.username);
  User.register(new User({ 
    email: req.body.username,
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
          console.log("this is from the server route, after the passport authenticate" + req.body.business_name);
        });

      
      });

      
  });
  
});

app.post('/auth/login', passport.authenticate('local'), function (req, res) {
  res.json(true);
  console.log("user is authenticated");
});

app.get('/auth/check', function (req, res) {
  if (req.user) {
      res.json({ user: req.user });
  }
  else {
      res.json(false);
  }
});

app.get('/auth/logout', function (req, res) {
  req.logout();
  res.json(true);
});

app.get("/getBusinessData/", function (req, res) {
  Business.findOne()
  .then(foundBusiness => res.json(foundBusiness));

})


app.get("/getSearchResults/:searchTerm", function (req, res) {
  console.log("search term" + JSON.stringify(req.params));
  Business.find({service_category: { $regex: '^' + req.params.searchTerm}})
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
