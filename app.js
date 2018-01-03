var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User = require("./models/user"),
    seedDb     = require("./seed")


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDb();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "This can be any text",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.get("/", function(req,res){
   res.render("landing")
});

app.get("/campgrounds", function(req,res){
    // get all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
       if(err) {
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds:campgrounds}); 
       }
    });
    
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // create a new Campground into DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
        
    });
});

app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
});
//show
app.get("/campgrounds/:id", function(req, res){ 
    //render correct campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// =================
//comments
// =================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground: campground}) 
        }
  
    });
});
app.post("/campgrounds/:id/comments", isLoggedIn,function(req, res){
           Campground.findById(req.params.id, function(err, campground){
               if(err){
                   console.log(err);
               } else {
                   Comment.create(req.body.comment, function(err, newComment){
                       if(err){
                           console.log(err);
                       } else {
                           console.log(campground);
                           campground.comments.push(newComment._id);
                           campground.save();
                             res.redirect("/campgrounds/" + req.params.id);
                       }
                   })
               }
           }) 
});


// ===========
// AUTH ROUTES
// ===========

// sign up form
app.get("/register", function(req, res) {
    res.render("register");
})
//sign up
app.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){ 
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds")
        })
    })
})
// login form
app.get("/login", function(req, res){
    res.render("login");
})
// login
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
    res.send("sd")
})
// logout
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("YelpCamp is running...")
// })
app.listen(8080, function(){
    console.log("YelpCamp is running...")
})