var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    seedDb     = require("./seed")

seedDb();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


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
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground: campground}) 
        }
  
    });
});
app.post("/campgrounds/:id/comments", function(req, res){
           Campground.findById(req.params.id, function(err, campground){
               if(err){
                   console.log(err);
               } else {
                   Comment.create(req.body.comment, function(err, newComment){
                       if(err){
                           console.log(err);
                       } else {
                           console.log(campground);
                           campground.comments.push(newComment_id);
                           campground.save();
                             res.redirect("/campgrounds/" + req.params.id);
                       }
                   })
               }
           }) 
});

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("YelpCamp is running...")
// })
app.listen(8080, function(){
    console.log("YelpCamp is running...")
})