module.exports =  function Greetings() {
    
    let greetMessage = "";
    let namesList = {};
    let name = "";
    let counter = 0;

    function setGreetMessage(name, language) {
        if (language === "french") {
            greetMessage =  "Bonjour " + name
        }

        if (language === "english") {
            greetMessage = "Hello " + name
        }

        if (language === "sepedi") {
            greetMessage = "Dumela " + name;
        }
    }

    function getGreetings() {
        return greetMessage
    }

    function recordGreetedNames(name) {
        // check if name exists
        if (namesList[name] === undefined) {
            namesList[name] = 1;
        } else{
            namesList[name] ++
        }
    }

    function counter() {
        let count = Number(namesList) || 0;
        return count ++
    }

    function getGreetedNames() {
        return namesList
    }


    function greetedCount() {
        return Object.keys(namesList).length
    }
    
    return {
        setGreetMessage,
        getGreetings,
        recordGreetedNames,
        greetedCount,
        getGreetedNames,
        counter
    }
}