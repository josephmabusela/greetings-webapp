const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const Greetings = require('./greet');
//const session = require('express-session');
//const flash = require('express-flash');


const app = express();
const greetings = Greetings();

let greetMessage = "";
let counter = 0;

app.engine('handlebars', exphbs());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));


// parse application in ->/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

// parse application in -> / json
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('home', {
    greetMessage: greetings.getGreetingMessage(),
    counter: greetings.greetedNamesCounter(),
  });
  console.log(greetMessage);
})

app.post('/greet', function(req, res) {

  greetings.setGreetLanguage(req.body.greetLanguage);
  greetings.setGreetMessage(req.body.nameInput);
  greetings.recordGreetedNames(req.body.name);
  greetings.greetedNamesCounter(req.body.counter)
  greetings.getGreetingMessage();
  res.redirect('/');

  console.log(greetMessage)
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