var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').pool;


var config={
    user:'jegatheshwaran36',
    Database:'jegatheshwaran36',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.emv.DB_PASSWORD,
}

var app=express();
app.use(morgan('combined'));

var articles=
{
 'Article-one':{
    title: 'hi i am jegatheshwaran madurai tamilnadu',
    heading: 'Article one',
    date: '10 aug',
    content:
    `<p>
    i need to improve my skills
   </p>
    <p>
    i need to improve my skills
     </p>
     <p>
     this is article one
     </p>`
},
'Article-two':{
    title: 'hi i am jegatheshwaran madurai tamilnadu',
    heading: 'Article two',
    date: '28 aug',
    content:
    `<p>
    i need to improve my skills
   </p>
    <p>
    i need to improve my skills
     </p>
     <p>
     this is article two
     </p>`
},
'article-three':{
  title: 'hi i am jegatheshwaran madurai tamilnadu',
    heading: 'article three',
    date: '22 aug',
    content:
    `<p>
    i need to improve my skills 
   </p>
    <p>
     i need to improve my skills
     </p>
     <p>
     this is article three
     </p>`
},
};

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
   ${date}
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

var pool =new pool (config);
app.get('/test-db', function (req, res) {
// make a selrct request
//return a response with the result
pool.query('SELECT=FROM test',(err,result)){
    if (err){
        res.status(500).send(err.tostring());
    }else{
        res.send(JSON.string(result));

    }
}
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

app.get('/:articlename', function (req, res) {
    //articleone ==article-one
    //article[articlename]={} content for article one
    var articlename = req.params.articlename;
    res.send(createTemplate(articles[articlename]));
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
