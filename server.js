var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));<html>
<head>
    <title>
       hi i'm jegatheshwaran: madurai: tamilnadu
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="/ui/style.css" rel="stylesheet" />
    <body>
    <div class="container">
        <o hr='/'>Home</o>
    </div>    
    <hr/>
    <h3>
    Aug 17 in noida
        </h3>
   <div>
      <p>
    very irritated noida. no genuine person in the world, All are very well selfiesssss 
    Someone is there with me they are not humans 
    </p>
    <p>
     whose who are cheating others and who cann't care about others, they are respected by world.
     who are genuine they are mental in the world
     </p>
</div>
</body>    
</html>

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/Article-one', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

app.get('/Article-two', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/Article-three', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
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
