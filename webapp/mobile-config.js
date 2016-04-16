/* global App */

// This section sets up some basic app metadata,
// the entire section is optional.

App.info({
  id: 'io.mabike.mobileapp',
  name: 'mabike',
  description: 'mabike',
  author: 'mabike team',
  email: 'info@mabike.io',
  website: 'http://mabike.io',
  version: '0.1'
});

// Prevent app crash because splash screen plugin references invalid view controller
App.setPreference('FadeSplashScreenDuration', '0');

App.accessRule('http://*.mabike.io/*');
App.accessRule('https://*.mabike.io/*');
App.accessRule('http://fonts.googleapis.com/*');
App.accessRule('http://fonts.gstatic.com/*');
App.accessRule('https://enginex.kadira.io/*');
App.accessRule('https://*.amazonaws.com/*');
App.accessRule('https://*.facebook.com/*');
App.accessRule('http://*.opentok.com/*');
App.accessRule('https://*.opentok.com/*');
App.accessRule('http://*.google-analytics.com/*');
App.accessRule('https://*.google-analytics.com/*');
// App.accessRule('http://api.adorable.io/*');
App.accessRule("blob:*"); // https://github.com/meteor/meteor/issues/5202
App.launchScreens({
  'android_mdpi_portrait': 'private/images/mobile/drawable-mdpi/splash.9.png',
  'android_mdpi_landscape': 'private/images/mobile/drawable-mdpi/splash.9.png',
  'android_hdpi_portrait': 'private/images/mobile/drawable-hdpi/splash.9.png',
  'android_hdpi_landscape': 'private/images/mobile/drawable-hdpi/splash.9.png',
  'android_xhdpi_portrait': 'private/images/mobile/drawable-xhdpi/splash.9.png',
  'android_xhdpi_landscape': 'private/images/mobile/drawable-xhdpi/splash.9.png',
  // 'android_ldpi_portrait': 'private/images/mobile/android-port-ldpi.png',
  // 'android_ldpi_landscape': 'private/images/mobile/android-land-ldpi.png',
  // 'android_mdpi_portrait': 'private/images/mobile/android-port-mdpi.png',
  // 'android_mdpi_landscape': 'private/images/mobile/android-land-mdpi.png',
  // 'android_hdpi_portrait': 'private/images/mobile/android-port-hdpi.png',
  // 'android_hdpi_landscape': 'private/images/mobile/android-land-hdpi.png',
  // 'android_xhdpi_portrait': 'private/images/mobile/android-port-xhdpi.png',
  // 'android_xhdpi_landscape': 'private/images/mobile/android-land-hdpi.png',
  'iphone': 'private/images/mobile/iphone.splash.png',
  'iphone_2x': 'private/images/mobile/iphone_2x.splash.png',
  'iphone5': 'private/images/mobile/iphone5.splash.png',
  'iphone6': 'private/images/mobile/iphone6.splash.png',
  'iphone6p_portrait': 'private/images/mobile/iphone6p_portrait.splash.png',
  'iphone6p_landscape': 'private/images/mobile/iphone6p_landscape.splash.png',
  'ipad_portrait': 'private/images/mobile/ipad_portrait.splash.png',
  'ipad_portrait_2x': 'private/images/mobile/ipad_portrait_2x.splash.png',
  'ipad_landscape': 'private/images/mobile/ipad_landscape.splash.png',
  'ipad_landscape_2x': 'private/images/mobile/ipad_landscape_2x.splash.png'
});

// Set up resources such as icons and launch screens.
App.icons({
  'android_ldpi': 'private/images/mobile/android_ldpi.icon.png',
  'android_mdpi': 'private/images/mobile/android_mdpi.icon.png',
  'android_hdpi': 'private/images/mobile/android_hdpi.icon.png',
  'android_xhdpi': 'private/images/mobile/android_xhdpi.icon.png',
  'iphone': 'private/images/mobile/iphone.icon.png',
  'iphone_2x': 'private/images/mobile/iphone_2x.icon.png',
  'iphone_3x': 'private/images/mobile/iphone_3x.icon.png',
  'ipad': 'private/images/mobile/ipad.icon.png',
  'ipad_2x': 'private/images/mobile/ipad_2x.icon.png'
});

/*
// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: '1234567890',
  API_KEY: 'supersecretapikey'
});
*/

App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference("KeyboardDisplayRequiresUserAction", false);
App.setPreference('Orientation', 'all', 'ios');
App.setPreference('BackgroundColor', '0xfff8e71d', 'ios'); // Restriction to iOS is required for Crosswalk
// App.setPreference('BackgroundColor', '0xfff8e71d');
App.setPreference('StatusBarOverlaysWebView', true);
//App.setPreference('StatusBarBackgroundColor', '#ec1561');
App.setPreference('StatusBarBackgroundColor', '#000000');
//App.setPreference('StatusBarStyle', 'lightcontent');
App.setPreference('ShowSplashScreenSpinner', false);
