var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = require("../middleware");
// new
router.get("/new", middlewareObj.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground: campground}) 
        }
  
    });
});
// create
router.post("/", middlewareObj.isLoggedIn,function(req, res){
           Campground.findById(req.params.id, function(err, campground){
               if(err){
                   console.log(err);
               } else {
                   Comment.create(req.body.comment, function(err, newComment){
                       if(err){
                           console.log(err);
                       } else {
                           newComment.author.id=  req.user._id;
                           newComment.author.username = req.user.username;
                           newComment.save();
                           campground.comments.push(newComment._id);
                           campground.save();
                             res.redirect("/campgrounds/" + req.params.id);
                       }
                   })
               }
           }) 
});

//edit
router.get("/:comment_id/edit", middlewareObj.checkCommentOwener, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment) {
        if(err) {
            res.redirect("back");
        } else{
            res.render("comments/edit", {campground_id: req.params.id, comment:comment})
        }
    })
    
});
// update
router.put("/:comment_id", middlewareObj.checkCommentOwener, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })
})

// destory
router.delete("/:comment_id", middlewareObj.checkCommentOwener,function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
      if(err){
          res.redirect("back");
      } else{
          res.redirect("/campgrounds/" + req.params.id)
      }
  })
})



module.exports = router;