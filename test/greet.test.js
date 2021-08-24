const assert = require('assert');

const Greetings = require('../greeting');

describe("Language greeting", function() {
    it("should return French as a language", function() {
        var greetingLanguage = Greetings();
        greetingLanguage.setGreetLanguage("French");

        assert.equal("French", greetingLanguage.getGreetLanguage())
    });

    it("should return English as a language", function() {
        var greetingLanguage = Greetings();
        greetingLanguage.setGreetLanguage("English");

        assert.equal("English", greetingLanguage.getGreetLanguage())
    });

    it("should return Sepedi as a language", function() {
        var greetingLanguage = Greetings();
        greetingLanguage.setGreetLanguage("Sepedi");

        assert.equal("Sepedi", greetingLanguage.getGreetLanguage())
    });
})

describe("Langauge greeting message", function() {

    it("should return Bonjour for French greeting", function() {
        var greetingLanguage = Greetings();
        greetingLanguage.setGreetLanguage("french");
        greetingLanguage.setGreetings("Bonjour ")

        assert.equal("Bonjour ", greetingLanguage.getGreetings("Bonjour "));
    });

    it("should return Hello for English greeting", function() {
        var greetingLanguage = Greetings();
        greetingLanguage.setGreetLanguage("english");
        greetingLanguage.setGreetings("Hello ")

        assert.equal("Hello ", greetingLanguage.getGreetings("Hello "));
    });

    it("should return Dumela for Sepedi greeting", function() {
        var greetingLanguage = Greetings();
        greetingLanguage.setGreetLanguage("sepedi");
        greetingLanguage.setGreetings("Dumela ")

        assert.equal("Dumela ", greetingLanguage.getGreetings("Dumela "));
    });
})

describe("Greet names", function() {

    it("should greet Kopano", function() {
        var greetMe = Greetings();
        greetMe.storeName("Kopano");

        assert.equal("Kopano", greetMe.getStoreName());
    });

    it("should greet John", function() {
        var greetMe = Greetings();
        greetMe.storeName("John");

        assert.equal("John", greetMe.getStoreName());
    });

    it("should greet Thabang", function() {
        var greetMe = Greetings();
        greetMe.storeName("Thabang");

        assert.equal("Thabang", greetMe.getStoreName());
    });

    it("should be able to store greeted names", function() {
        var nameList = Greetings();

        nameList.storeName("Kopano");
        nameList.getStoreName();
        nameList.exisitingNames();
        nameList.storeName("John");
        nameList.getStoreName();
        nameList.exisitingNames();
        nameList.storeName("John");
        nameList.getStoreName();
        nameList.exisitingNames();
        nameList.storeName("Thabang");
        nameList.getStoreName();
        nameList.exisitingNames();

        assert.deepEqual([ 'Kopano', 'John', 'Thabang' ], nameList.exisitingNames())
    })
})