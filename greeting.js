module.exports =  function Greetings() {
    
    let greetMessage = "";
    //let errors = ""
    let namesList = {};
    let count = 0;

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

    function getGreetedNames() {
        return namesList
    }


    function greetedCount() {
        return Object.keys(namesList).length
    }

    function errorMessages(){
        if (setGreetMessage(language) == "") {
            
        }
        const reachedWarningLevel = total >= warningLevel 
            && total < criticalLevel;

        return reachedWarningLevel;
    }

    function hasReachedCriticalLevel(){
        const total = grandTotal();
        return total >= criticalLevel;
    }
    
    return {
        setGreetMessage,
        getGreetings,
        recordGreetedNames,
        greetedCount,
        getGreetedNames,
        //errorText
    }
}