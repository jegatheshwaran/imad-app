
//Submit username and password to login
var NamesInput = document.getElementById('names');
var Names= namesInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    //Create a request object
    var request = new XMLHttpRequest();

    //Capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //take sone action
            if (request.status === 200){
                console.log('user logged in');
                alert('log in success');
            } else if (request.status === 403 ){
                alert('invalid user')
            } else if (request.status === 500){
                alert('Something is wrong with the server');
            }
        }
        // not done yet
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
    request.open('POST', 'http://jegatheshwaran36.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));    
};