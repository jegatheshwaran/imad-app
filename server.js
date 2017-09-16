var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user:'jegatheshwaran36',
    Database:'jegatheshwaran36',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD //environment variable to protect password
    
};

var app=express();
app.use(morgan('combined'));
app.use(body-Parser.json());
app.use(session({
    secret: 'someRandomsecretvalue',
    cookie:{makeAge: 1000 * 60 * 60 * 24 *30}
}));


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
      return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function (req, res) {
    var hashedstring = hash (req.params.input,'this-is-some-random-string');
  res.send(hashedstring);
});

app.post('/create-user',function(req,res){
    //username,password
   //{"username": "Jegathshwaran", "password": "password"}
    //JSON
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    dbstring = hash (password,salt);
    pool.query('INSERT INTO "user"(username,password)VALUES($1,$2)',[username,dbstring],function(err,result){
        if (err){
            res.status(500).send(err.toString());
        }
        else{
            res.send('user successfully created:' + username);
    }
    });
});

app.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
      pool.query('SELECT * FROM "user"username = $1',[username],function(err,result){
        if (err){
            res.status(500).send(err.tostring());
        }
        else{
            if(result.rows.length ===0 ){
            res.send(403),send ('username/password is invalid');
            }else{
                //match password
                var dbstring = result.rows[0].password;
                var salt = dbstring.split('$')[z];
                
                var hashedpassword = hashed (password,salt);//creating a hash bashed on password submitted and the original salt
                if (hashedpassword === dbstring){
            
            //set the session
            req.session.auth= { userId: result.rows[0].id};
            //set cookie with a sessionid
            //internally, on server side,it mags session id to an object
            //{auth:{userId}}
                    res.send('credentials correct!');
                    }else{
                    res.send(403).send('username/password is invalid');   
                }
                }
          }  

    });
});

app.get('/check-login', function(req,res)
{
    if (req.session && req.session.auth && req.session.auth.userId) { 
res.send ('you are logged in:' + req.session.auth.userId());
        }
    else{ res.send('you are not logged in');
    }
});

var Pool=require('pg').Pool;
app.get('/test-db', function (req, res) {
// make a selrct request
//return a response with the result
pool.query('SELECT * FROM test',function(err,result){
    if (err){
        res.status(500).send(err.toString());
    }else{
        res.send(JSON.stringify(result.rows));
    }
});
});


var counter = 0;
app.get('/counter', function (req, res) 
{
  counter = counter+1;
  res.send(counter.toString());
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
         res.staus(500).send(err.toString());
     }else{
         if (result.rows.length===0){
             res.status(404).send('article not done');
         }else{
               var articledata= result.rows[0];
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
