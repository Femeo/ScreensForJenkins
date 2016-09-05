// Client side calls and actions that I will be making.
var accessibilityModeOn = false;
var main = function(){
    if ($('#screenID').val()){
        displayUrls();      
    }
    
    /*$('#viewScreen').click(function(){
        $.ajax({
           type: 'POST',
            url: '/view/:id',
            data: {
                screenID: $('#screenID').val()
            },
            success: function(data){
                console.log('URL Update success');
            },
            error: function(){
                console.log('ERROR Update');
            }
        });
    });*/
};

$(function() {
    $("#urlList").sortable({
        placeholder: "ui-sortable-placeholder",
        axis: "y",
        containment: "body",
        cursor: "move"
    });
});

function urlIndex() {
    
}

function addUrl() {
    var urlToAdd = $('#addUrl').val();
    console.log("Add URL function entered.")
    $.ajax({
        type: 'POST',
        url: '/urls/add',
        data: {
            url: urlToAdd,
            screenID: $('#screenID').val()
        },
        success: function (data) {
            console.log('Ajax response for URL addition', data);
            $('#urlError').hide();
            displayUrls();

        },
        error: function () {
            console.log(ERROR);
        }
    });
    
    $('#url').val('').focus();
}

function displayUrls(){
    console.log('Calling display URLs');
    
    
       $.getJSON("/screens/" + $('#screenID').val(), function(result){
        var activeUrls = '',
            link = '',
            screens = result.screens;
           console.log('GET JSON result: ', result);
        if(screens.length === 0){
            $('#urlList').html('<li class="urlScreenList text-center"><p>There are currently no URLs connected to this screen</p></li>');
        } else {
            $(result.screens.reverse()).each(function(i, url){
                var urlLength = result.screens.length;
                                
                    activeUrls += '<li class="urlScreenList" value="'+i+'">' + url.link + '<a href="/screens/delete/' + url._id + '"><span class="glyphicon glyphicon-remove pull-right"></span></a></li>';
                    
           return activeUrls;
            });
            $('#urlList').html(activeUrls);
        }
    });
}

// TODO - refactor
function turnOnAccessibility(){
    if(accessibilityModeOn == false){
        $('body').css('color', !accessibilityModeOn ? 'black' : '#0076A3');
        $('body').css('font-weight','700');
        $('th').css('background-color','black');
        $('td').css('color','black');
        $('.accessibility').css('background-color','black');
        $('.btn-primary').css('background-color','black');
        $('#newUrl').css('background-color','black');
        $('#newUrl').css('border','1px solid white');
        
        accessibilityModeOn = !accessibilityModeOn;
        
    } else if (accessibilityModeOn == true){
        $('body').css('color','#0076A3');
        $('body').css('font-weight','300');
        $('th').css('background-color','#0076A3');
        $('td').css('color','#0076A3');
        $('.accessibility').css('background-color','#0076A3');
        $('.btn-primary').css('background-color','#0076A3');
        $('#newUrl').css('background-color','rgb(221,221,221)')
        $('#newUrl').css('border','1px solid rgb(221,221,221)');
       
        accessibilityModeOn = false;
    }
}
    
$(document).ready(main);