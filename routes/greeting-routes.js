/* eslint-disable prefer-const */
module.exports = function GreetingRoutes (greetings) {
    function index (req, res) {
        const name = req.params.name;
        const namesList = greetings.getGreetedNames();

        res.render('index', {
            greetMessage: greetings.getGreetings(),
            name,
            namesList,
            counter: req.session.counter
        });
    }

    function greet (req, res) {
        // eslint-disable-next-line prefer-const
        let name = greetings.getGreetings().name;
        let language = greetings.getGreetings().language;

        if (name === undefined) {
            req.flash('error', 'Please enter a name');
        } else if (language === undefined) {
            req.flash('error', 'Please select a greet language');
        } else if (name === undefined && language === undefined) {
            req.flash('error', 'Please enter a name and select a greet language');
        } else {
            req.flash('success', 'Name registered');
            greetings.setGreetMessage(req.body.name, req.body.language);
            greetings.recordGreetedNames(req.body.name);
        }

        if (!req.session.counter) {
            req.session.counter = 0;
        } else {
            req.session.counter++;
        }
        res.redirect('/');
    }

    function reset (req, res) {
        req.session.counter = 0;
        res.redirect('/');
    }

    function greeted (req, res) {
        const names = greetings.getGreetedNames();
        res.render('greeted', {
            names
        });
    }

    function greetedName (req, res) {
        const personsName = req.params.name;
        const namesList = greetings.getGreetedNames();
        const personsCounter = namesList[personsName];

        res.render('counter', {
            personsCounter,
            personsName
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
