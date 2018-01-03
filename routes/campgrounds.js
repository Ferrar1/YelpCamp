var expree = require("express");
var router = expree.Router();
var Campground = require("../models/campground");

//index
router.get("/", function(req,res){
    // get all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
       if(err) {
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds:campgrounds}); 
       }
    });
    
});
// create
router.post("/",isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
      id: req.user._id,
      username: req.user.username
    };
    var newCampground = {name: name, image: image, description: description, author: author};
    // create a new Campground into DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated)
            res.redirect("/campgrounds");
        }
        
    });
});
// new
router.get("/new",isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});
//show
router.get("/:id", function(req, res){ 
    //render correct campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;