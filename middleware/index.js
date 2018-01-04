var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCommentOwener = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err, foundcomment){
            if(err) {
                req.flash("error", "Comment not found")
                res.redirect("back")
            } else{
                //  matched?
                if(foundcomment.author.id.equals(req.user._id)) {
                    next();
                } else {
                   req.flash("error", "You don't have permission")
                   res.redirect("back")
                }
            }
        })
    } else {
                req.flash("error", "You need to be logged in")
         res.redirect("back")
    }
   
}

middlewareObj. checkCampgroundOwener = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err, campground){
            if(err) {
                req.flash("error", "Campground not found")
                res.redirect("back")
            } else{
                //  matched?
                if(campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission")
                   res.redirect("back")
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in")
         res.redirect("back")
    }
   
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in")
    res.redirect("/login");
}

module.exports = middlewareObj;