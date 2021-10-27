/* eslint-disable prefer-const */
module.exports = function Greetings (pool) {
    let greetMessage = '';
    // let errorText = ""
    // eslint-disable-next-line prefer-const
    let namesList = {};
    // let count = 0;

    async function addName (name) {
        let checkName = await pool.query('SELECT username FROM greeted WHERE username = $1', [name]);

        if (checkName.rowCount === 0) {
            await pool.query('INSERT INTO greeted(username, greet_count) VALUES($1, $2)', [name, 1]);
        } else {
            await pool.query('UPDATE greeted SET greet_count = greet_count + 1 WHERE username = $1', [name]);
        }
    }

    async function setGreetMessage (name, language) {
        name = name.toString();
        let nameFormat = name[0].toString()[0].toUpperCase() + name.slice(1).toLowerCase();
        await addName(nameFormat);
        if (language === 'french') {
            greetMessage = 'Bonjour ' + nameFormat;
        }

        if (language === 'english') {
            greetMessage = 'Hello ' + nameFormat;
        }

        if (language === 'sepedi') {
            greetMessage = 'Dumela ' + nameFormat;
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
        namesList = await pool.query('SELECT COUNT(username) FROM greeted');
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
