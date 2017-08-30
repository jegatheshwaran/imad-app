//counter code
 var button = document.getElementById('counter');
 
 button.onclick = function(){
     
   //create a request object
   var request = new xmlHttpRequest();
   
    //capture the respone and store is in variable
   request.onReadystatechange =function(){
       if (request.readystate === XMLhttpRequest.DONE){
        //take some action 
         if (request.status === 200){
             var counter = request.responeText;
             var span = document.getElementById('counter');
             span.innXML = counter.tostring();
         
         }
       }
       // no done yet
   };
   
   //make the request
   request.open('GET','http://jegatheshwaran36.imad.hasura-app.io/counter',true);
   request.send(null);
 };
   
 