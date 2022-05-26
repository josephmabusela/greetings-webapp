module.exports =  function Greetings() {
    
    let greetMessage = "";
    let lang;
    let nameInput;
    let count;
    let namesList = [];

    function setGreetLanguage(language) {
        lang = language
    }

    function getGreetLanguage() {
        return lang
    }

    function setGreetMessage(name) {

        nameInput = name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();

        if (getGreetLanguage() === "french") {
            greetMessage =  "Bonjour " + nameInput;
        }

        if (getGreetLanguage() === "english") {
            greetMessage = "Hello " + nameInput;
            
        }

        if (getGreetLanguage() === "sepedi") {
            greetMessage = "Dumela " + nameInput;
        }
    }

    function getGreetingMessage() {
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

    function greetedNamesCounter() {
        //let count = Number(namesList) || 0;
        count = Number(count)
        count++;
    }

    function getGreetedNames() {
        return namesList
    }


    function greetedCount() {
        return Object.keys(namesList).length
    }
    
    return {
        setGreetLanguage,
        getGreetLanguage,
        setGreetMessage,
        getGreetingMessage,
        recordGreetedNames,
        greetedCount,
        getGreetedNames,
        greetedNamesCounter,
        //errorText
    }
}

 