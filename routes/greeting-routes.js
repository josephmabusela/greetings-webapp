/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const { Pool } = require('pg');

const Greeting = require('../greeting');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const greeted = Greeting(pool);

module.exports = function GreetingRoutes (greeting) {
    function index (req, res, next) {
        let name = req.params.name;
        let language = req.body.language;
        let namesList = greeting.getGreetedNames();

        res.render('index', {
            greetMessage: greeting.getGreetings(),
            name,
            language,
            namesList,
            counter: req.session.counter
        });
    }

    function greet (req, res) {
        // eslint-disable-next-line prefer-const
        let name = req.params.name;
        let language = req.body.language;
        let counter = req.session.counter;

        if (name === '' && language !== undefined) {
            req.flash('error', 'Please enter a name');
            res.redirect('/');
        } else {
            if (name !== '' && language === undefined) {
                req.flash('error', 'Please select a language');
                res.redirect('/');
            }
            if (name === undefined && language === undefined) {
                req.flash('error', 'Please enter a name and select a language');
                res.redirect('/');
            }
            greeting.setGreetMessage(req.body.name, req.body.language);
            greeting.recordGreetedNames(req.body.name);
            req.flash('success', 'Name registered');
            counter++;
        }

        res.redirect('/');
    }

    function reset (req, res) {
        req.session.counter = 0;
        res.redirect('/');
    }

    function greeted (req, res) {
        let names = greeting.getGreetedNames();

        if (!req.session.counter) {
            req.session.counter = 0;
        } else {
            req.session.counter++;
        }
        res.render('greeted', {
            names,
            counter: req.session.counter
        });
    }

    function greetedName (req, res) {
        let personsName = req.params.name;
        let namesList = greeting.getGreetedNames();
        let personsCounter = namesList[personsName];

        res.render('counter', {
            personsCounter,
            personsName,
            namesList
        });
    }

    return {
        index,
        greet,
        reset,
        greeted,
        greetedName
    };
};
