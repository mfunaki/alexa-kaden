## Alexa Skills Kit - Sample for Kaden (home appliance)

## Overview
This is a simple exmaple of handlling voice command to a TV and a AC (Air Conditioner).

What I would like to evaluate is dialoguing (or ambiguity resolution).  
As both TV and AC have Power, so if you simply say 'turn on(スイッチつけて)', then Alexa is expected to ask the user to narrowing down the target device, i.e. either TV or AC.
On the other hand, only TV has Channel, so if you say 'next channel(次のチャンネル)', TV is not explicitly mentioned, however, Alexa is not expected to ask the target device.

Though Alexa has a dialoguing feature (https://developer.amazon.com/ja/docs/custom-skills/dialog-interface-reference.html ), Alexa Service Simulator doesn't support the feature,
so the feature was not intentionally used here.
