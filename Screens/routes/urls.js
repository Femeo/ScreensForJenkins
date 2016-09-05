var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var URL = mongoose.model('Url');

router.post('/add', function(req, res, next){
    console.log('Request from JQuery', req.body);
    //res.send()
    // Once information retreaved information needs to be stored
    //Save req body as new url to DB
    //var screenID = document.getElementById('screenID').value;
    var screenID = req.body.screenID
    var newURL = new URL();
    newURL.screen = screenID;
    console.log('Screen ID:', newURL.screen);
    //newURL.screen = req.body.screenId;
    newURL.link = req.body.url;
    
    
    // findOne - Looks through DB to see if already exists.
    // If it doesn't exist, save to DB.
    
    console.log('--HIT POINT--')
    URL.findOne({link: newURL.link, screen: newURL.screen}, function(err, urlMatch){
        console.log('Console has entered the findOne action.');
           if(err){
               return next(err);
               console.log('Error while trying to save new url', newUrl);
           }
            if(urlMatch !== null){
                res.send({status: 500});
            } else {
                newURL.save(function(err, newUrl){
                    if(err){
                        console.log('ERROR:', err);
                        return next(err);
                    }
                    res.send({id: req.body.id});
                });
            }   
    });
});

router.get('/view/:id', function(res, req, next){
    console.log('GET for URL Entered.');
    URL.find({screen: req.body.id}, function(err, updatedList){
        console.log('REQ.BODY.ID', req.body.id);
        if(err){
            console.log('Error:', err);
            return next(err);
        }
        res.render('screen');
    });
});

router.param('id', function(req, res, next, id){
    Screen.findById(id, function(err, match){
       if(err){
           console.log('Cannot Find Match');
           return next(err);
       } 
        req.screen = match;
        return next();
    });
});

module.exports = router;