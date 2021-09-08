module.exports =  function Greetings() {
    
    let greetMessage = "";
    //let errors = ""
    let namesList = {};

    function setGreetMessage(name, language) {
        if (language === "french") {
            greetMessage =  "Bonjour " + name[0].toUpperCase() + name.slice(1).toLowerCase()
        }

        if (language === "english") {
            greetMessage = "Hello " + name[0].toUpperCase() + name.slice(1).toLowerCase()
            
        }

        if (language === "sepedi") {
            greetMessage = "Dumela " + name[0].toUpperCase() + name.slice(1).toLowerCase();
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
        counter,
        //errorText
    }
}