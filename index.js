const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs  = require('express-handlebars');
const Greetings = require('./greeting');

const app = express();
const greetings = Greetings();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.use(express.static('public'));

// initialise session middleware - flash-express depends on it
app.use(session({
  secret : "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.get('/', function (req, res) {
    req.flash('info', 'Welcome');
    res.render('index', {
      title: 'Home'
    })
  });

app.get('/addFlash', function (req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
});

app.get('/greetings', function (req, res) {
    
});

app.get('/counter/<USER_NAME>', function (req, res) {
    
});

let PORT = process.env.PORT || 3010;

app.listen(PORT, function(){
  console.log('App started on port:', PORT);
});