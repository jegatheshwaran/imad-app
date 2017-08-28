console.log('Loaded!');

//change the text of main-text div

var element=document.getElementById('main-text');
element.innerText='New Born';

 //move the image
 var img=document.getElementbtId('madi');
 var marginLeft=0;
 function moveRight () {
     marginLeft =margin+10;
     img.style.marginLeft =marginLeft + 'px';
 }
 img.onclick= function(){
     var interval=setinterval(moveRight,100);
    
    
     
 };
 
 