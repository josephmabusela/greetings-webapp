// get references to the input field
const nameText = document.querySelector(".form-group");
const errorText = document.querySelector(".errorText");
// get references to the radio buttons
const radioButton = document.querySelector(".language");

// get reference to where the greeting will be displayed
const messageText = document.querySelector(".messageText");

// get reference to the greeting button
const greet = document.querySelector(".greet");

// get reference to the counter
const counterElement = document.querySelector(".counter");

// get a reference to the reset button
const reset = document.querySelector(".reset")

// make an instance of the greet factory function
const greetInstance = Greetings();

// make a function to display the greetings
function showGreeting() {
    // get a reference to the checked radio buttons
    let radioBtn = document.querySelector(".language:checked");

    if (radioBtn) {
        let checkedLang = radioBtn.value;
        //greetInstance.getGreetLanguage(radioBtn.value);
    }

    greetInstance.setGreetLanguage(checkedLang);
    greetInstance.getGreetLanguage();
    greetInstance.setGreetings()

    if (nameText.value !== "" && radioBtn) {
        message.innerHTML = greetInstance.getGreetings() + nameText.value.charAt(0).toUpperCase() + nameText.value.slice(1);
        message.style.color = "black"
    }

    // prompt usser to enter a valid name with no numbers or characters
    if (!nameText.value.match(/[a-zA-Z]/ig)) {
        errorText.innerHTML = "Please enter valid name"
        errorText.style.color = "red"

        setTimeout(() => {
            errorText.innerHTML = ""
        }, 3000);
    }

    // prompt user to enter a name if they havent
    if (nameText.value === "") {
        errorText.innerHTML = "Enter a name";
        errorText.style.color = "red"

        setTimeout(() => {
            errorText.innerHTML = ""
        }, 3000);
    }

    // prompt user to select a language if they havent
    if (!radioBtn) {
        errorText.innerHTML = "Select a language";
        errorText
        .style.color = "red";

        setTimeout(() => {
            errorText.innerHTML = ""
        }, 3000);
    }
}

if (localStorage.getItem("counter")) {
    counterElement.innerHTML = localStorage.getItem("counter")
}

function counterIncrease() {
    
    let count = Number(localStorage.getItem("counter")) || 0;
    count ++

    localStorage.setItem("counter", count);
    // display the local storage value
    counterElement.innerHTML = localStorage.getItem("counter");

    // initialize names to an empty array
    let names = [];
    
    if (localStorage.getItem("counter") == NaN ) {
        localStorage.setItem("counter", 0)
    }

    if (localStorage.getItem("names") === null) {
        localStorage.setItem("names", [])
    }

    //initialize names to equal local storage
    if (localStorage["names"]) {
        names = localStorage["names"]

        message.innerHTML = names
    }

}


// click handler for displaying the greetings
greetButton.addEventListener("click", function() {

    //radioBtn = document.querySelector(".radioButton:checked");

    var names = [].concat(localStorage.getItem("names").split(","))

    greetInstance.setGreetedNames(names)
    greetInstance.storeName(nameText.value);

    if (greetInstance.getStoreName() != "" && !names.includes(greetInstance.getStoreName()) && nameText.value.match(/[a-zA-Z]/ig) && document.querySelector(".radioButton:checked"))  {
        localStorage.setItem("names", greetInstance.exisitingNames())
        counterIncrease();
    }

    showGreeting();

    setTimeout(() => {
        message.innerHTML = ""
    }, 3000);

    // document.querySelector(".radioButton:uncheck")
    radioBtn = document.querySelector(".radioButton:checked").checked = false;
});

// click handler for reset button
reset.addEventListener("click", function() {
    localStorage.setItem("names", [])
    localStorage.setItem("counter", 0)
    counterElement.innerHTML = localStorage["counter"]
    errorText.innerHTML = "Counter has been reset!"
    errorText.style.color = "green";

    message.innerHTML = ""

    setTimeout(() => {
        errorText.innerHTML = ""
    }, 3000);           

})
