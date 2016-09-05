var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Screen = mongoose.model('Screen');
var Url = mongoose.model('Url');


router.get('/add', function(req, res, next){
    console.log('Routes to add a new screen');
    console.log(req.body);
    res.render('addScreen');
});

router.get('/edit/:id', function(req, res, next){
   console.log('Route to Edit Screen');
    
    if(req.screen !== null){
        res.render('updateScreen', {screen: req.screen});
    } else {
        console.log('Failed to load edit screen, defaulted to screen.ejs');
        res.render('screen');
    }
});

// Saves new values to the database
router.post('/edit/:id', function(req, res, next){
    // Comes from .param route:
    var updateScreen = req.screen;
    console.log('--UPDATE SCREEN--', updateScreen);
    updateScreen.screenOwner = req.body.screenOwner; 
    updateScreen.projectName = req.body.projectName;
    updateScreen.piNumber = req.body.piNumber;
    console.log('--UPDATE SCREEN *NEW*--', updateScreen);

    Screen.findOneAndUpdate({_id: updateScreen.id}, updateScreen, {upsert: true}, function(err, updated){
       console.log('Screen Updated');
        if(err){
            return next(err);
        }
        
        res.redirect('/');
        
    });
});

router.get('/delete/:id', function(req, res, next){
   console.log('Trying to find and delete URL.');
    var url = req.params;
    
    Url.findOneAndRemove({"_id": url.id}, function(err, removed){
       if(err){
           console.log('Error: ', err);
           return next(err);
       } 
        console.log('URL with id', url.id, 'removed.');
        res.redirect('/screens/view/' + removed.screen);
    });
});

router.get('/remove/:id', function(req, res, next){
   console.log('Routes to remove a screen');
    var record = req.screen;
    console.log('Remove Screen: ', record)
    // Removes screen depending on ID
    Screen.findOneAndRemove({_id: record.id}, function(err, removed){
        if(err){
            return next(err);
        }
        // Removes URL's from url collection that are related to the screen
        Url.remove({screen: record.id}, function(err, removed){
        if(err){
            return next(err);
        }
        });
        console.log('Record with id', record.id, 'removed.');
        return res.redirect('/');
        
    });
}); 

router.get('/view/:id', function(req, res){
    
   console.log('Routes to screens page');
    if(req.screen !== null){
    res.render('screen', {screen: req.screen});
        console.log('GET request executed with ID:', req.screen.id);
    } else {
        console.log('Failed to load screen, defaulted to Index.ejs');
        res.render('/screens');
    }
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

router.post('/add', function(req, res, next){
   console.log('Screen Input:\n');
   console.log(req.body);
    var newScreen = new Screen();
    newScreen.piNumber = req.body.piNumber;
    newScreen.screenOwner = req.body.screenOwner;    
    newScreen.projectName = req.body.projectName;
    newScreen.activeUrl = req.body.activeUrl;
    
    console.log('Active URLs', newScreen.activeUrl);
    
    Screen.findOne({
       piNumber: req.body.piNumber,
        screenOwner: req.body.screenOwner,
        projectName: req.body.projectName,
        
        
    },function(err, foundScreen){
       if (err){
           console.log('Failed to find matching screen using: ', req.body);
           return next(err);
       }
        
        if (foundScreen === null){
            // This is how to add a object to the Database.
            newScreen.save(function(err, screen){
               if(err){
                   console.log("Failed to add screen:", err);
                   return next(err);
               } 
                
                console.log("New element created", screen);
                res.redirect('/');
            });
        }
        else {
            res.render('addScreen', { message: "Screen already exists. Please try again."});
        }
    });
    
});

router.get('/:id', function(req, res, next){
    var screen = req.screen;
    console.log('Screen ID: ', screen.id);
    //console.log('Request: ', req.screen);
    Url.find({screen: screen.id})
        .populate('activeUrl')
        .exec(function(err, urls){
       if(err){
           console.log('Error: ', err);
           return next(err);
        }
        
        //console.log('URL List: ', urls);
        res.send({'screens': urls});
    });
});

router.get('/pi/:piNumber', function(req, res, next){
    var screen = req.screen;
    console.log('Screen ID: ', screen.id);
    //console.log('Request: ', req.screen);
    Url.find({screen: screen.id})
        .populate('activeUrl')
        .exec(function(err, urls){
       if(err){
           console.log('Error: ', err);
           return next(err);
        }
        
        //console.log('URL List: ', urls);
        res.send({'screens': urls});
    });
});

router.param('piNumber', function(req, res, next, piNumber){
    console.log('Searching for screen using Pi number.', piNumber);
    Screen.find({'piNumber': piNumber}, function(err, match){
       if(err){
           console.log('Cannot Find Match');
           return next(err);
       } 
        //console.log('MATCH IS ', match);
        req.screen = match[0];
        return next();
    });
});

module.exports = router;