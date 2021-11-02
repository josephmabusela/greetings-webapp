/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const pg = require('pg');
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://josephmabusela:Seleka11@localhost:5433/my_greetings';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

// const { Client, Pool } = require('pg');

// // set up client connection to database
// const client = new Client({
//     user: 'postgres',
//     password: 'Seleka11',
//     database: 'peopledb'
// });

// client.connect()
//     .then(() => console.log('Connected successfully'))
//     .then(() => client.query('SELECT * FROM greeted'))
//     .then(results => console.table(results.rows))
//     .catch(e => console.log(e))
//     .finally(() => client.end());

// let useSSL = false;
// let local = process.env.LOCAL || false;
// if (process.env.DATABASE_URL && !local) {
//     useSSL = true;
// }
// which db connection to use
// const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/greetings-app';

// set up pool connection to database
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

const app = express();
const Greetings = require('./greeting');
const GreetingRoutes = require('./routes/greeting-routes');
const greetings = Greetings(pool);
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
    saveUninitialized: true
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
