var main = function(){
  var max = 500;
  
  $('#count_message').html(max + ' characters remaining');
  
  $('#messageId').keyup(function(){
     var len = $(this).val().length;
     var remain = max - len;
     
     $('#count_message').html(remain + ' characters remaining');
     
     if (len === 0){
         return;
     }
  });  
};

$(document).ready(main);