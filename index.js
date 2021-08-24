const express = require('express');
const exphbs  = require('express-handlebars');
const Greetings = require('./greeting')

const app = express();
const greetings = Greetings();

app.engine('handlebars', exphbs());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', function(req, res) {
  res.render('index', {

    greeted: greetings.getStoreName(),
    counter: greetings.getGreetedNames(),

  });
})

app.post('/greeted', function(req, res) {

})

app.post('/counter/<USER_NAME>', function(req, res) {

})

const PORT = process.env.PORT || 3011;

app.listen(PORT, function() {
  console.log("App started at PORT: ", PORT)
})