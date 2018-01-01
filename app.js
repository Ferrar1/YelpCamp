var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    seedDb     = require("./seed")

seedDb();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


// Campground.create({
//     name: "Example",
//     image: "data:image/jpeg;base64,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",
//     description: "This is a example description"
    
// });

app.get("/", function(req,res){
   res.render("landing")
});

app.get("/campgrounds", function(req,res){
    // get all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
       if(err) {
           console.log(err);
       } else {
           res.render("index", {campgrounds:campgrounds});
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
   res.render("new"); 
});

app.get("/campgrounds/:id", function(req, res){ 
    //render correct campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    });
});

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("YelpCamp is running...")
// })
app.listen(8080, function(){
    console.log("YelpCamp is running...")
})