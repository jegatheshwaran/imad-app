//counter code
 var button = document.getElementById('counter');
 
 button.onclick = function(){
     var request = new XMLHttpRequest();
     
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
   request.open('GET', "http://jegatheshwaran36.imad.hasura-app.io/counter",true);
   request.send(null); 
   };
 

//Submit username and password
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    //Create a request object
    var request = new XMLHttpRequest();

    //Capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
                console.log('user logged in');
                alert('log in success');
            } else if (request.status === 403 ){
                alert('invalid user')
            } else if (request.status === 500){
                alert('Something is wrong with the server');
            }
        }
    };
        
    //Submit comment
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    //enable for debugging only
    //console.log(username);
    //console.log(password);

    //Make a request to the counter. use below if running on hasura-app
    //request.open('GET', "http://jegatheshwaran36.imad.hasura-app.io/submit-comment?comment="" + comment, true);

    //Make a request, use below if running on localhost
    request.open('POST', 'http://../login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));    
};