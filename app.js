var express = require("express");
var app = express();
var bodyParser = require("body-parser");
   var campgrounds = [
        {name: "Lake Park", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyzzZ4fXn3Nz6u7VAmMOpT-c2NytdSrLmtNT1g2OhBOiQEzg-oMw"},
        {name: "Lake Park", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyzzZ4fXn3Nz6u7VAmMOpT-c2NytdSrLmtNT1g2OhBOiQEzg-oMw"},
        {name: "Lake Park", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyzzZ4fXn3Nz6u7VAmMOpT-c2NytdSrLmtNT1g2OhBOiQEzg-oMw"},
        {name: "Lake Park", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyzzZ4fXn3Nz6u7VAmMOpT-c2NytdSrLmtNT1g2OhBOiQEzg-oMw"},
        {name: "Lake Park", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyzzZ4fXn3Nz6u7VAmMOpT-c2NytdSrLmtNT1g2OhBOiQEzg-oMw"},
        {name: "Lake Park", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyzzZ4fXn3Nz6u7VAmMOpT-c2NytdSrLmtNT1g2OhBOiQEzg-oMw"},
        {name: "Lake Park", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyzzZ4fXn3Nz6u7VAmMOpT-c2NytdSrLmtNT1g2OhBOiQEzg-oMw"}



    ];
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
   res.render("landing")
});

app.get("/campgrounds", function(req,res){

    res.render("campgrounds", {campgrounds: campgrounds});
});


app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampgrounds = {name: name, image: image};
    campgrounds.push(newCampgrounds);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});


// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("YelpCamp is running...")
// })
app.listen("8080", function(){
    console.log("YelpCamp is running...")
})