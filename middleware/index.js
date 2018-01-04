var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCommentOwener = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err, foundcomment){
            if(err) {
                res.redirect("back")
            } else{
                //  matched?
                if(foundcomment.author.id.equals(req.user._id)) {
                    next();
                } else {
                   res.redirect("back")
                }
            }
        })
    } else {
         res.redirect("back")
    }
   
}

middlewareObj. checkCampgroundOwener = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err, campground){
            if(err) {
                res.redirect("back")
            } else{
                //  matched?
                if(campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                   res.redirect("back")
                }
            }
        })
    } else {
         res.redirect("back")
    }
   
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;