var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name: "Clouds",
        image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
        description: "This is nice"
    },
    {
        name: "Clouds",
        image: "https://farm4.staticflickr.com/3881/14146164489_0cb49d2904.jpg",
        description: "This is nice"
    },
    {
        name: "Sunday",
        image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg",
        description: "This is nice"
    }   
];

function seedDb(){
    // Remove All
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed"); 
        }
        
        // Add a few 
        data.forEach(function(seed){
           Campground.create(seed, function(err, newCampground){
               if(err){
                   console.log(err);
               } else {
                   console.log("Created")
                   Comment.create({
                       text: "This is a comment",
                       author: "author"
                   }, function(err, newComment){
                       if(err){
                           console.log(err);
                       } else {
                           newCampground.comments.push(newComment._id);
                           newCampground.save();
                           console.log("Create new comment");
                         
                       }
                   })
               }
           }) 
        });
    });

}

module.exports = seedDb;