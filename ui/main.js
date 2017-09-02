//counter code
 var button = document.getElementById('counter');
 
 button.onclick = function(){
     
  
   {
             var counter = request.responeText;
             var span = document.getElementById('counter');
             span.innerHTML = counter.tostring();
        
         }
       }
       // no done yet
   

 
   //submit name
    var nameinput= document.getElementById('name');
    var names = nameinput.value;
    var submit = document.getElementById('submit_btn');
    submit.onclick = function(){
         //create a request object
   var request = new XMLHttpRequest();
   
    //capture the respone and store is in variable
   request.onReadystatechange =function(){
       if (request.readystate === XMLHttpRequest.DONE){
        //take some action 
         if (request.status === 200)
         {
        //capture a list of  the name and render as it as a list
        var names =['name1','name2','name3','name4'];
        var list='';
        for (var i=0; i<names.length; i++){
            list += '<li>' +names[i]+ '</li>';
            
        }
        var ul= document.getElementById('namelist');
        ul.innerHTML=list;
    }
       }
       //yet not done
 };
      //make the request
   request.open('GET', 'http://jegatheshwaran36.imad.hasura-app.io/counter',true);
   request.send(null);
 };
 