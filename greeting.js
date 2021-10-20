module.exports = function Greetings (pool) {
    let greetMessage = '';
    // let errorText = ""
    // eslint-disable-next-line prefer-const
    let namesList = {};
    // let count = 0;

    function setGreetMessage (name, language) {
        name = name.toString();
        if (language === 'french') {
            greetMessage = 'Bonjour ' + name[0].toUpperCase() + name.slice(1).toLowerCase();
            pool.query('INSERT INTO person VALUES($1)', [greetMessage]);
        }

        if (language === 'english') {
            greetMessage = 'Hello ' + name[0].toString()[0].toUpperCase() + name.slice(1).toLowerCase();
            pool.query('INSERT INTO person VALUES($1)', [greetMessage]);
        }

        if (language === 'sepedi') {
            greetMessage = 'Dumela ' + name[0].toUpperCase() + name.slice(1).toLowerCase();
            pool.query('INSERT INTO person VALUES($1)', [greetMessage]);
        }
    }

    function getGreetings () {
        return greetMessage;
    }

    function recordGreetedNames (name) {
        // check if name exists
        if (namesList[name] === undefined) {
            namesList[name] = 1;
        } else {
            namesList[name]++;
        }
    }

    async function getGreetedNames () {
        namesList = await pool.query('SELECT COUNT(name) FROM person');
        return namesList;
    }

    async function greetedCount () {
        const counter = await pool.query('SELECT COUNT(*) FROM person WHERE name=$1', [namesList]);
        return counter.rows[0].count;
    }

    // function greetedCount () {
    //     return Object.keys(namesList).length;
    // }

    return {
        setGreetMessage,
        getGreetings,
        recordGreetedNames,
        greetedCount,
        getGreetedNames
    };
};
