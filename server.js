var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user:'jegatheshwaran36',
    Database:'jegatheshwaran36',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD //environment variable to protect password
    
};

var app=express();
app.use(morgan('combined'));
app.use(bodyParser.json());


function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
var htmlTemplate=`
<html>
<head>
    <title>
        ${title}
    </title>    
    <meta name="viewport" content="width=device-width, initial-scale=1" />
     <link href="/ui/style.css" rel="stylesheet" />
</head>     
<body>
    <div class="container">
    <div>
        <o hr='/'>Home</o>
    </div>    
<hr/>
<h3>
   ${heading}
</h3>
<div>
   ${date.todatestring()}
</div>
<div>
${content}
</div>
</div>
</body>    
</html>`;

return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    //how do we create a hash?
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.tostring('hex')].join('$');
}

app.get('/hash/:input', function (req, res) {
    var hashedstring = hash (req.params.input,'this-is-some-random-string');
  res.send(hashedstring);
});

app.post('/create-user',function(req,res){
    //username,password
   {"username": "Jegathshwaran", "password": "password"}
    //JSON
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.RandomBytes(128).tostring('hex');
    dbstring = hash (password,salt);
    pool.query('INSERT INTO "user"(username,password)VALUES($1,$2)',[username,dbstring],function(err,result){
        if (err){
            res.status(500).send(err.tostring());
        }
        else{
            res.send('user successfully created:' + username);
    }
    });
});



var Pool=require('pg').Pool;
app.get('/test-db', function (req, res) {
// make a selrct request
//return a response with the result
pool.query('SELECT * FROM test',function(err,result){
    if (err){
        res.status(500).send(err.tostring());
    }else{
        res.send(JSON.stringify(result.rows));
    }
});
});


var counter = 0;
app.get('/counter', function (req, res) 
{
  counter = counter+1;
  res.send(counter.tostring());
});

var names=[];
app.get('/submit-name',function (req,res){
    //URL: /submit-name?name=xxxx
    //get the name from request
    var name = req.query.name;
   names.push(name);
   //JSON: Javascript object notation
   res.send(JSON.stringify(names));
});  

app.get('/articles/:articlename', function (req, res) {
    //articlename==article-one
    //article[articlename]={} content for article one
     
     //select * from article where title ='\'; DELETE WHERE a= \'asdf'
     pool.query ("select * from article where title = $1",[req.params.articlename],function(err,result){
     if (err){
         res.staus(500).send(err.tostring());
     }else{
         if (result.rows.length===0){
             res.status(404).send('article not done');
         }else{
             var articledata= result.row[0];
             res.send(createtemplate(articledata));
         }
     }
     });
});
app.get('/ui/style.css.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
