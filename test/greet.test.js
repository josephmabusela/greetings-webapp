const assert = require('assert');
const Greetings = require('../greet');

describe('Language selector', function() {

    it('should return English as a language', function() {
        let greetLanguage = Greetings();
        greetLanguage.setGreetLanguage('english');

        assert.equal('english', greetLanguage.getGreetLanguage())
    });

    it('should return French as a language', function() {
        let greetLanguage = Greetings();
        greetLanguage.setGreetLanguage('french');

        assert.equal('french', greetLanguage.getGreetLanguage())
    });

    it('should return Sepedi as a language', function() {
        let greetLanguage = Greetings();
        greetLanguage.setGreetLanguage('sepedi');

        assert.equal('sepedi', greetLanguage.getGreetLanguage())
    });
})

describe('Greeting message', function() {

    it('should return Hello for an English greeting', function() {
        let greetingMessage = Greetings();
        greetingMessage.setGreetLanguage('english');
        greetingMessage.setGreetMessage('Kopano');

        assert.equal('Hello ' + 'Kopano', greetingMessage.getGreetingMessage('Hello ' + 'Kopano'))
    });

    it('should return Hello for an French greeting', function() {
        let greetingMessage = Greetings();
        greetingMessage.setGreetLanguage('french');
        greetingMessage.setGreetMessage('Kopano');

        assert.equal('Bonjour ' + 'Kopano', greetingMessage.getGreetingMessage('Bonjour ' + 'Kopano'))
    });

    it('should return Hello for an Sepedi greeting', function() {
        let greetingMessage = Greetings();
        greetingMessage.setGreetLanguage('sepedi');
        greetingMessage.setGreetMessage('Kopano');

        assert.equal('Dumela ' + 'Kopano', greetingMessage.getGreetingMessage('Dumela ' + 'Kopano'))
    });
})
