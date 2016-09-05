var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Screen = mongoose.model('Screen');

router.get('/', function(req, res, next){
    
    var result = {title:"Home", user:"Ryan"};
    
    Screen.find(function(err, screens){
       if(err){
           return next(err);
       } 
        if(screens !== null){
            console.log('Found Screens', screens);
            result.screens = screens;
            /*result.pingIP = function (ip) {
                var g_serverup = false;
                console.log(ip)
                var komodel = new pingModel([ip]);
                //sendPingRequest(ip)
                return g_serverup; 
            };*/
            console.log('--Result--', result.screens);            
            res.render('index', {"screens" : result.screens}); 
        }
    });
    
});

module.exports = router;

