var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

app.use("/public", express.static(__dirname + '/public'));

app.get("/json", (req, res) => {
  const helloString = "Hello json";

  if (process.env.MESSAGE_STYLE == 'uppercase') {
    return res.json({"message": helloString.toUpperCase()});
  } else {
    return res.json({"message": helloString});
  }
  });

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  return res.json({"time": req.time});
});

app.get('/:word/echo', (req, res, next) => {
  console.log(req.params)
  res.json({'echo': req.params.word})
  next();
})

app.get('/name', (req, res, next) => {
  res.json({name: req.query.first + ' ' + req.query.last});
});

app.post('/name', (req, res, next) => {
  console.log(req.body.first);
  res.json({name: req.body.first + ' ' + req.body.last});
})



console.log('Hello World');



































 module.exports = app;
