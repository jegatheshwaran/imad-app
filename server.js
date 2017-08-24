var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app=express();
app.use(morgan('combined'));

var articles={
`Article-one`={
    title: `hi i'm jegatheshwaran: madurai: tamilnadu`,
    heading: `Article one`,
    date: `22 aug',
    content:`
    <p>
    `i need to improve my skills '
   </p>
    <p>
    i need to improve my skills
     </p>
     <p>
     this is article one
     </p>`
},
`Article-two`={
      title: `hi i'm jegatheshwaran: madurai: tamilnadu`,
    heading: `Article two`,
    date: `22 aug',
    content:`
    <p>
    `i need to improve my skills '
   </p>
    <p>
    i need to improve my skills
     </p>
     <p>
     this is article two
     </p>`
     },
`article-three`={
     title: `hi i'm jegatheshwaran: madurai: tamilnadu`,
    heading: `Article three`,
    date: `22 aug',
    content:`
    <p>
    `i need to improve my skills '
   </p>
    <p>
     i need to improve my skills
     </p>
     <p>
     this is article three
     </p>`
},


function createTemplate(data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
var htmltemplate=<html>
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
</html>';
return htmlTempalte;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/Article-one', function (req, res) {
    //articleone ==article-one
    //article[articlename]={} content for article one
    var articlename=req.params.articlename;
    res.send(createTemplate(articles[articlename]));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
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
