'use strict';

const Alexa = require('alexa-sdk');
const appId = 'amzn1.ask.skill.16e4ef64-d0f8-48f2-85be-fa10f0724d22';


exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = appId;  // Given template was alexa.APPID_ID = APP_ID, but should be like this.
    alexa.dynamoDBTableName = 'KadenStateTable';
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const kACPower = 'ACPower';
const kACTemp = 'ACTemp';
const kTVPower = 'TVPower';
const kTVChannel = 'TVChannel';
const vPowerOn = 'ON';
const vPowerOff = 'OFF';

const handlers = {
    'NewSession': function () {
        this.response.speak('家電を音声で操作できます。何でもお申し付けください。');

        // AC
        this.attributes[kACPower] = vPowerOff;  // ON or OFF
        this.attributes[kACTemp] = 20;          // default = 20
        // TV
        this.attributes[kTVPower] = vPowerOff;  // ON or OFF
        this.attributes[kTVChannel] = 1;        // default = 1

        this.emit(':responseReady');
    },
    'TurnACPowerOnIntent': function () {
        console.log("TurnACPowerOnIntent: " + this.event.request.dialogState);

        var current = this.attributes[kACPower];
        var message;
        if (current == vPowerOn) {
            message = 'エアコンの電源はすでにオンです。';
        } else {
            message = 'エアコンの電源をオンにします。';
            this.attributes[kACPower] = vPowerOn;
        }

        this.response.speak(message);
        this.emit(':responseReady');
    },
    'TurnACPowerOffIntent': function () {
        console.log("TurnACPowerOffIntent: " + this.event.request.dialogState);

        var current = this.attributes[kACPower];
        var message;
        if (current == vPowerOff) {
            message = 'エアコンの電源はすでにオフです。';
        } else {
            message = 'エアコンの電源をオフにします。';
            this.attributes[kACPower] = vPowerOff;
        }

        this.response.speak(message);
        this.emit(':responseReady');
    },
    'TurnTVPowerOnIntent': function () {
        console.log("TurnTVPowerOnIntent: " + this.event.request.dialogState);

        var current = this.attributes[kTVPower];
        var message;
        if (current == vPowerOn) {
            message = 'テレビの電源はすでにオンです。';
        } else {
            message = 'テレビの電源をオンにします。';
            this.attributes[kTVPower] = vPowerOn;
        }

        this.response.speak(message);
        this.emit(':responseReady');
    },
    'TurnTVPowerOffIntent': function () {
        console.log("TurnTVPowerOffIntent: " + this.event.request.dialogState);

        var current = this.attributes[kTVPower];
        var message;
        if (current == vPowerOff) {
            message = 'テレビの電源はすでにオフです。';
        } else {
            message = 'テレビの電源をオフにします。';
            this.attributes[kTVPower] = vPowerOff;
        }

        this.response.speak(message);
        this.emit(':responseReady');
    },
    'ChangeTVChannelPrevIntent': function () {
        console.log("ChangeTVChannelPrevIntent: " + this.event.request.dialogState);

        var channel = this.attributes[kTVChannel] - 1;
        var message;
        if (channel < 1) {
            channel = 12;
        }
        this.attributes[kTVChannel] = channel;
        message = 'テレビのチャンネルは ' + channel + ' です。';

        this.response.speak(message);
        this.emit(':responseReady');
    },
    'ChangeTVChannelNextIntent': function () {
        console.log("ChangeTVChannelNextIntent: " + this.event.request.dialogState);

        var channel = this.attributes[kTVChannel] + 1;
        var message;
        if (channel > 12) {
            channel = 1;
        }
        this.attributes[kTVChannel] = channel;
        message = 'テレビのチャンネルは ' + channel + ' です。';

        this.response.speak(message);
        this.emit(':responseReady');
    },
    'TurnACTempUpIntent': function () {
        console.log("ChangeACTempUpIntent: " + this.event.request.dialogState);

        var temp = this.attributes[kACTemp] + 1;
        var message;
        if (temp > 30) {
            temp = 30;
        }
        this.attributes[kACTemp] = temp;
        message = 'エアコンの設定温度は ' + temp + ' です。';

        this.response.speak(message);
        this.emit(':responseReady');
    },
    'TurnACTempDownIntent': function () {
        console.log("ChangeACTempDownIntent: " + this.event.request.dialogState);

        var temp = this.attributes[kACTemp] - 1;
        var message;
        if (temp < 16) {
            temp = 16;
        }
        this.attributes[kACTemp] = temp;
        message = 'エアコンの設定温度は ' + temp + ' です。';

        this.response.speak(message);
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        console.log("Unhandled: " + this.event.request.dialogState);
        const message = '処理できませんでした。';
        this.response.speak(message).listen(message);
        this.emit(':responseReady');
    }
};
