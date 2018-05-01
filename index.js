const Alexa = require('alexa-sdk');

const handlers = {
  LaunchRequest () {
    this.response
      .speak('What name would you like to know about?')
      .listen('To start, you can ask for the length or first letter of name.');
    this.emit(':responseReady');
  },
  GetNameIntent () {
    this.attributes.name = this.event.request.intent.slots.name.value;

    this.response
      .speak(`Alright. You can ask me about the first letter or the length of ${this.attributes.name}.`)
      .listen (`Tell me what you'd like to know about ${this.attributes.name}.`);

    this.emit(':responseReady');
  },
  FirstLetterIntent () {
    if(this.event.request.intent.slots.name.value) {
      this.attributes.name = this.event.request.intent.slots.name.value;
    }
    if(this.attributes.name) {
      this.response
      .speak(`The first letter is ${this.attributes.name[0]}. How about asking for the length?`)
      .listen(`You can ask for the length of ${this.attributes.name} or give me a new name altogether.`);
      this.emit(':responseReady');
    } else {
      this.emit('LaunchRequest');
    }
  }
};


exports.handler = function(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = "";
  alexa.registerHandlers(handlers);
  alexa.execute();
};
