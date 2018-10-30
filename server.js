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
          console.log("this is from the server route, after the passport authenticate", req.body.business_name);
        });

      
      });   
  }); 
});

app.post('/business/editProfile', function (req, res) {
  console.log("this is from the server, before the edit profile route - checking req.body", req.body)
  Business.update(
    {
      users: { "$elemMatch": { "$eq":mongoose.Types.ObjectId(req.user._id) } }
    },
    {
      // Set the title, note and modified parameters
      // sent in the req body.
      
      $set: {
        business_name: req.body.business_name,
        service_category: req.body.service_category,
        address_street: req.body.address_street,
        address_city: req.body.address_city,
        address_state: req.body.address_state,
        address_zip: req.body.address_zip,
        phone_number: req.body.phone_number,
        service_counties: req.body.service_counties,
        value_prop: req.body.value_prop
      }
    },
    function(error, edited) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
       res.json(edited);
      }
    }
  );
})


app.post('/auth/login', passport.authenticate('local'), function (req, res) {
  res.json(true);
  console.log("server login route: user is authenticated");
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

app.get("/getBusinessData/:businessID", function (req, res) {
  Business.findById(req.params.businessID)
  .then(foundBusiness => res.json(foundBusiness));

})


app.get("/getSearchResults/:searchTerm", function (req, res) {
  console.log("server search route: search term", JSON.stringify(req.params));
  Business.find({service_category: { $regex: '^' + req.params.searchTerm}})
  .then(foundBusiness => res.json(foundBusiness));

})

app.get('/auth/user', function (req, res) {
  if (req.user) {
      res.json({ user: req.user });
      console.log('server auth user route: its working');
  }
  else {
      res.json(false);
  }
});


app.get('/auth/userID', function (req, res) {
  if (req.user._id) {
      res.json({ user: req.user._id });
  }
  else {
      res.json(false);
  }
});

app.get('/auth/business/byUserID', function (req, res) {
  console.log("server get business by user id route", req.user);
  if (req.user) 
  Business.find({users: { "$elemMatch": { "$eq":mongoose.Types.ObjectId(req.user._id) } }})
  .then(foundBusiness => res.json(foundBusiness));
  else {
      res.json(false);
  }
});



// Send every request to the React app
// Define any API routes before this runs

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
