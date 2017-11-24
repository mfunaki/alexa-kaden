'use strict';

const Alexa = require('alexa-sdk');
const appId = 'amzn1.ask.skill.16e4ef64-d0f8-48f2-85be-fa10f0724d22';


exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = appId;  // Given template was alexa.APPID_ID = APP_ID, but should be like this.
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'NewSession': function () {
        this.response.speak('家電を音声で操作できます。何でもお申し付けください。');
        this.emit(':responseReady');
    },
    'ChangeDevicePowerIntent': function () {
        console.log("current dialogState: " + this.event.request.dialogState);
        if (this.event.request.dialogState !== 'COMPLETED') {
            this.emit(':delegate');
        } else {
            var target = this.event.request.intent.slots.target.value;
            var powerState = this.event.request.intent.slots.powerState.value;

            this.response.speak(target + 'の電源を' + powerState + 'にしました。');
            this.emit(':responseReady');
        }
    },
    'Unhandled': function () {
        console.log("UNHANDLED");
        const message = '処理できませんでした。';
        this.response.speak(message).listen(message);
        this.emit(':responseReady');
    }
};
