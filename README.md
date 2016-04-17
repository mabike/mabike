# BikeBuzz
BikeBuzz allows people to report stolen bikes and find them via crowdsourcing

It uses the following API's:
* RNV stops (Mobility challenge) to get the next station from where you can get home if your bike was stolen
* Philips Hue (Internet of Everything challenge) to simulate a Bluetooth Low Energy device to detect a stolen bike (click on the user icon and then on ```Logout``` to trigger this)
* Most popular babynames in Mannheim (Open Data MashUp Challenge) to display a "Did you know?" message if a username matches one of the names listed in this data set. Usernames are simulated at random, as the app does not feature user management yet.

The app can be used in a desktop browser, as an Android app, and as an iOS app.

# Installation
This is a Meteor application.
* Please install Meteor.js from here: http://www.meteor.com
* In the folder ```webapp```, type ```meteor``` to start the server
* In a desktop browser, you can access the app via http://localhost:3000

To deploy the app onAndroid, connect the device in USB debugging mode and then type ```meteor run android-device```
To deploy the app on iOS, install Xcode, connect the device to your Mac and type ```meteor run ios-device```. Xcode will show up. Select your device and press the ```Play```button.
