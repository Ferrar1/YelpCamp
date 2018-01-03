var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name: "Clouds",
        image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
        description: "This is niceLorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nibh et felis imperdiet condimentum. Maecenas dui felis, bibendum nec cursus ac, finibus vel odio. Vivamus est nisl, ultrices vel iaculis vitae, ultricies ut eros. Praesent sed odio vulputate, convallis dui eget, elementum tellus. Maecenas vehicula metus vel finibus egestas. Quisque mattis nulla tellus, ac gravida justo rutrum at. Nam id aliquet justo. Suspendisse aliquet quis velit et gravida. Proin mattis diam massa, et dapibus mi gravida a. Sed condimentum tincidunt augue, vel finibus turpis mattis et. Nunc et leo magna. Ut lectus ante, congue in commodo nec, porttitor sit amet ante. Nulla aliquam, enim venenatis varius vehicula, sem nisl consectetur velit, non cursus mi velit vitae dolor. Nullam risus dui, semper non enim vitae, tincidunt scelerisque augue. Ut bibendum finibus pellentesque."
    },
    {
        name: "Clouds",
        image: "https://farm4.staticflickr.com/3881/14146164489_0cb49d2904.jpg",
        description: "This is niceLorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nibh et felis imperdiet condimentum. Maecenas dui felis, bibendum nec cursus ac, finibus vel odio. Vivamus est nisl, ultrices vel iaculis vitae, ultricies ut eros. Praesent sed odio vulputate, convallis dui eget, elementum tellus. Maecenas vehicula metus vel finibus egestas. Quisque mattis nulla tellus, ac gravida justo rutrum at. Nam id aliquet justo. Suspendisse aliquet quis velit et gravida. Proin mattis diam massa, et dapibus mi gravida a. Sed condimentum tincidunt augue, vel finibus turpis mattis et. Nunc et leo magna. Ut lectus ante, congue in commodo nec, porttitor sit amet ante. Nulla aliquam, enim venenatis varius vehicula, sem nisl consectetur velit, non cursus mi velit vitae dolor. Nullam risus dui, semper non enim vitae, tincidunt scelerisque augue. Ut bibendum finibus pellentesque."
    },
    {
        name: "Sunday",
        image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae nibh et felis imperdiet condimentum. Maecenas dui felis, bibendum nec cursus ac, finibus vel odio. Vivamus est nisl, ultrices vel iaculis vitae, ultricies ut eros. Praesent sed odio vulputate, convallis dui eget, elementum tellus. Maecenas vehicula metus vel finibus egestas. Quisque mattis nulla tellus, ac gravida justo rutrum at. Nam id aliquet justo. Suspendisse aliquet quis velit et gravida. Proin mattis diam massa, et dapibus mi gravida a. Sed condimentum tincidunt augue, vel finibus turpis mattis et. Nunc et leo magna. Ut lectus ante, congue in commodo nec, porttitor sit amet ante. Nulla aliquam, enim venenatis varius vehicula, sem nisl consectetur velit, non cursus mi velit vitae dolor. Nullam risus dui, semper non enim vitae, tincidunt scelerisque augue. Ut bibendum finibus pellentesque."
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
        //  // Add a few 
        // data.forEach(function(seed){
        //   Campground.create(seed, function(err, newCampground){
        //       if(err){
        //           console.log(err);
        //       } else {
        //           console.log("Created")
        //           Comment.create({
        //               text: "This is a comment",
        //               author: "author"
        //           }, function(err, newComment){
        //               if(err){
        //                   console.log(err);
        //               } else {
        //                   newCampground.comments.push(newComment._id);
        //                   newCampground.save();
        //                   console.log("Create new comment");
                         
        //               }
        //           })
        //       }
        //   }) 
        // });
       
    });

}

module.exports = seedDb;