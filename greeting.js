module.exports = function Greetings () {
    let greetMessage = '';
    // let errorText = ""
    // eslint-disable-next-line prefer-const
    let namesList = {};
    // let count = 0;

    function setGreetMessage (name, language) {
        name = name.toString();
        if (language === 'french') {
            greetMessage = 'Bonjour ' + name[0].toUpperCase() + name.slice(1).toLowerCase();
        }

        if (language === 'english') {
            greetMessage = 'Hello ' + name[0].toString()[0].toUpperCase() + name.slice(1).toLowerCase();
        }

        if (language === 'sepedi') {
            greetMessage = 'Dumela ' + name[0].toUpperCase() + name.slice(1).toLowerCase();
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

    function getGreetedNames () {
        return namesList;
    }

    function greetedCount () {
        return Object.keys(namesList).length;
    }

    return {
        setGreetMessage,
        getGreetings,
        recordGreetedNames,
        greetedCount,
        getGreetedNames
    };
};
