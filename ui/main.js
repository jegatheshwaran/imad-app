//counter code
 var button = document.getElementById('counter');
 
 button.onclick = function(){
     
  //create the response and store it in a vaeiable
  request.onreadystatechange=function(){
      if (request.readystate===XTMLHttpRequest.Done){
          //take action 
          if (requset. status === 200)
   {
             var counter = request.responeText;
             var span = document.getElementById('counter');
             span.innerHTML = counter.tostring();
        
         }
       }
       // no done yet
  };
 //make the request
   request.open('GET', 'http://jegatheshwaran36.imad.hasura-app.io/counter',true);
   request.send(null); 
   };
 
   //submit name
    var nameinput= document.getElementById('name');
    var names = nameinput.value;
    var submit = document.getElementById('submit_btn');
    submit.onclick = function(){
         //create the response and store it in a vaeiable
  request.onreadystatechange=function(){
      
      if (request.readystate===XTMLHttpRequest.Done){
          //take action 
          if (requset. status === 200)
   {    
       //capture a list of  the name and render as it as a list
        var names = request.responseText;
        names =JSON.parse(names);
        var list='';
        for (var i=0; i<names.length; i++){
            list += '<li>' +names[i]+ '</li>';
            
        }
        var ul= document.getElementById('namelist');
        ul.innerHTML=list;
  
         }
       }
       // no done yet
  };
 //make the request
   request.open('GET', 'http://jegatheshwaran36.imad.hasura-app.io/submit-names=' +name ,true);
   request.send(null); 
        };
        
   
  
 