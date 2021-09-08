module.exports =  function Greetings() {
    
    let greetMessage = "";
    let errors = ""
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

    // function errorText() {
    //     // prompt usser to enter a valid name with no numbers or characters
    //     if (!nameText.value.match(/[a-zA-Z]/ig)) {
    //         errorText.innerHTML = "Please enter valid name"
    //         errorText.style.color = "red"

    //         setTimeout(() => {
    //             errorText.innerHTML = ""
    //         }, 3000);
    //     }

    //     // prompt user to enter a name if they havent
    //     if (nameText.value === "") {
    //         errorText.innerHTML = "Enter a name";
    //         errorText.style.color = "red"

    //         setTimeout(() => {
    //             errorText.innerHTML = ""
    //         }, 3000);
    //     }

    //     // prompt user to select a language if they havent
    //     if (!radioBtn) {
    //         errorText.innerHTML = "Select a language";
    //         errorText
    //         .style.color = "red";

    //         setTimeout(() => {
    //             errorText.innerHTML = ""
    //         }, 3000);
    //     }
    // }

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
        errorText
    }
}