/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const pg = require('pg');
const Pool = pg.Pool;

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/greetings-app';

const pool = new Pool({
    connectionString,
    ssl: useSSL
}); ;

const app = express();
const Greetings = require('./greeting');
const GreetingRoutes = require('./routes/greeting-routes');
const greetings = Greetings();
const greetingRoutes = GreetingRoutes(greetings);

app.engine('handlebars', exphbs());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// initialising necessary middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use(express.static('public'));

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: 'This is my secret sessions string',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

// routes instances
app.get('/', greetingRoutes.index);
app.post('/greet', greetingRoutes.greet);
app.post('/reset', greetingRoutes.reset);
app.get('/greeted', greetingRoutes.greeted);
app.get('/greeted/:name', greetingRoutes.greetedName);

const PORT = process.env.PORT || 3011;
app.listen(PORT, function () {
    console.log('App started at PORT: ', PORT);
});
