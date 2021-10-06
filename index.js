const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const pg = require('pg');
const Pool = pg.Pool;
const app = express();

// initialise session middleware - flash-express depends on it
app.use(session({
  secret : "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}))

// initialise the flash middleware
app.use(flash());

const Greetings = require('./greeting');
const greetings = Greetings();

//let greetMessage = ""

app.engine('handlebars', exphbs());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

app.use(express.static('public'));


// parse application in ->/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

// parse application in -> / json
app.use(bodyParser.json());

app.get('/', function(req, res) {


 //getting the name from params
 let personsName = req.params.name;

 //get all names and the counter for each person. 
 let namesList = greetings.getGreetedNames();

 //access using the keys to get the value. 
 //let count = namesList[personsName] || 0

    res.render('index', {
    greetMessage: greetings.getGreetings(),
    personsName,
    namesList,
    counter : req.session.counter
  });
})



app.post('/greet', async function(req, res) {

  if (((req.body.name === "" && req.body.language !== undefined )) ||
  ((req.body.name !== "" && req.body.language === undefined)) ||
  ((req.body.name === "" && req.body.language === undefined))) {
    req.flash('info', 'Please enter a name and choose a greeting language');
    res.redirect('/');

  } else {
    greetings.setGreetMessage(req.body.name, req.body.language);
    greetings.recordGreetedNames(req.body.name);

    req.flash('info2', 'Name greeted');
    res.render('index', {
      userData: {
        greet: await greetings.getGreetings()
      },
      counter: await greetings.greetedCount()
    })
  }


  // if (!req.session.counter) {
  //   req.session.counter = 0;
  // }
  // req.session.counter++;

  // if (req.session.reset) {
  //   req.session.counter = 0;
  // }
  //res.redirect('/');
})

app.post('/reset', function(req, res) {

  req.session.counter = 0;
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