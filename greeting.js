module.exports =  function Greetings() {
    var namesList = [];
    var user;
    var lang;
    var greet;

    function setGreetLanguage(language) {
        lang = language
    }

    function getGreetLanguage() {
        return lang
    }

    function setGreetings() {
        if (getGreetLanguage() === "french") {
            greet =  "Bonjour "
        }

        if (getGreetLanguage() === "english") {
            greet =  "Hello "
        }

        if (getGreetLanguage() === "sepedi") {
            greet =  "Dumela ";
        }
    }

    function getGreetings() {

        return greet
    }

    function storeName(str) {
       user = str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    }

    function getStoreName() {
        return user;
    }

    function setGreetedNames(userInput) {
        namesList = userInput
    }

    function getGreetedNames() {
        return namesList
    }

    function exisitingNames() {
        if (!namesList.includes(user)) {
            namesList.push(user);
        }
        return namesList
    }


    return {
        storeName,
        setGreetLanguage,
        getStoreName,
        getGreetLanguage,
        getGreetedNames,
        setGreetedNames,
        exisitingNames,
        setGreetings,
        getGreetings
    }
}