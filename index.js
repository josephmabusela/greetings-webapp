const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const Greetings = require('./greeting');
//const session = require('express-session');
//const flash = require('express-flash');


const app = express();
const greetings = Greetings();

//app.engine('handlebars', exphbs());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(express.json());
//app.use(flash());
app.use(express.urlencoded({ extended: false }));

// parse application in ->/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

// parse application in -> / json
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('index', {
    greet: greetings.getGreetings() 
  });
})

app.post('/greet', function(req, res) {
  
  greetings.setGreetings(req.body.name, req.body.language);

  console.log(greetings.getGreetings());
  res.redirect('/');
})

app.post('/counter/', function(req, res) {

})

const PORT = process.env.PORT || 3011;

app.listen(PORT, function() {
  console.log("App started at PORT: ", PORT)
})