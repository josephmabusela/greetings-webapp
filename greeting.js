module.exports =  function Greetings() {
    let namesList = [];
    let person;
    let greetText;
    let greet;

    function setGreetings(name, language) {
        if (language == "english") {
            greetText = "Hello " + name
        }
        else if (language == "french") {
            greetText = "Bonjour " + name
        }
        else if (language == "sepedi") {
            greetText = "Dumela " + name
        }
        else {
            greetText = ""
        }
    }

    function getGreetings() {
        return greetText;
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
        setGreetings,
        getStoreName,
        getGreetings,
        getGreetedNames,
        setGreetedNames,
        exisitingNames,
    }
}