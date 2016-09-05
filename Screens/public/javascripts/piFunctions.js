var main = function(){
    var piId = '578e600d78f3dd7439ff1bf7';
    
    console.log('piFunctions.js started.')
    $.getJSON("/screens/" + piId, function(result){
        var activeUrls = '',
            link = '';
           console.log('GET JSON result: ', result);
           $(result.screens).each(function(i, url){
               
              console.log('URL on displayUrls function: ', url);
               activeUrls += url.link;
               
               chrome.windows.create(url, function(){
                   if(err){
                       return err
                   } else {
                       console.log('Browser Opended, URLs loaded.');
                   }
               });
           });
    }); 
    
}

$(document).ready(main);