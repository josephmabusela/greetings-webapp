const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const Greetings = require('./greeting');
//const session = require('express-session');
//const flash = require('express-flash');


const app = express();
const greetings = Greetings();

let greetMessage = ""

app.engine('handlebars', exphbs());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));


// parse application in ->/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

// parse application in -> / json
app.use(bodyParser.json());

app.get('/', function(req, res) {
  let counter = greetings.counter()
    res.render('index', {
    greetMessage: greetings.getGreetings(),
    counter,
  });
})

app.post('/greet', function(req, res) {

  greetings.setGreetMessage(req.body.name, req.body.language)
  // greetings.setPerson(req.body.name)
  // greetings.setGreetLanguage(req.body.language)
  greetings.recordGreetedNames(req.body.name)
  res.redirect('/');
})

app.get('/greeted', function(req, res) {
  let names = greetings.getGreetedNames()
  res.render('greeted', {
    names
  })
})

//to get the name you will get it from from your dynamic route 
app.get("/greeted/:name", function(req, res) {

  //getting the name from params
  let personsName = req.params.name
  //get all names and the counter for each person. 
  let namesList = greetings.getGreetedNames()
  //access using the keys to get the value. 
  let personsCounter = namesList[personsName] 

  //then  you can  render personsCounter and the personsName.
  res.render('counter', {
    personsCounter,
    personsName
  })
})

const PORT = process.env.PORT || 3011;

app.listen(PORT, function() {
  console.log("App started at PORT: ", PORT)
})