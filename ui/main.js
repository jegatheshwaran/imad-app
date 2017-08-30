//counter code
 var button = document.getElemntById('counter');
 var counter = 0;
 
 button.onclick = function(){
   
   //make request to counter endpoint
   
   //capture the respone and store is in variable
   
   //render the variable in correct span
   counter = counter + 1;
   var span = document.getElementById('counter');
   span.innerHTML= counter.tostring();
 };
 