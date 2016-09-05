var main = function(){
    
    $('#submitUpdateScreen').click(function(){
       var errors = validateScreen();
        
        if(errors !== ''){
            $('#alerts').html('<ul class="errors">' + errors + '</ul>').show();
        } else {
           $('#addForm').submit(); 
        }
            return false;
    });

    $('#submitNewScreen').click(function(){
       var errors = validateScreen();
        
        if(errors !== ''){
            $('#alerts').html('<ul class="errors">' + errors + '</ul>').show();
        } else {
           $('#addForm').submit(); 
        }
            return false;
    });
    
    $('#newUrl').click(function(){
        console.log('Button Clicked');
        var errors = validateUrl();
        if (errors !== ''){
            $('#urlError').html('<ul class="errors alert alert-danger">' + errors + '</ul>').show().fadeOut(8000);
        } else {
            console.log("Add URL Function called.");
            addUrl();
        }
    });
    
    function validateScreen(){
        var piNumber = $('#piNumber').val(),
            projectName = $('#projectName').val(),
            screenOwner = $('#screenOwner').val(),
            errors = '',
            piRegEx = /^[0-9]*$/,
            ownerRegEx = /^[A-Za-z ]{2,35}$/;
            

        if(!piNumber){
            errors+= '<li>Please enter a Pi number.</li>';
        } 

        if(!piRegEx.test(piNumber)){
            errors += '<li>Please check the Pi number.</li>';
        } 
        
        if(!ownerRegEx.test(screenOwner)){
            errors += '<li>Please check that you have entered a valid name.</li>';
        }
            return errors;
    }
    
    function validateUrl(){
        var url = $('#addUrl').val();
        console.log(url);
        var urlregex = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
        var error = '';
        if (!urlregex.test(url)){
          error = 'Incorrect URL entered';
        }
        return error;
    }
};

$(document).ready(main);