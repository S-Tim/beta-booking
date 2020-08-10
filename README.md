# Beta Booking

Are you also tired of entering all your data over and over again to book your bouldering timeslots?
If so, then this is the perfect browser extension for you!  

![Beta-Booking Popup Image](readme_images/beta-booking-popup.png?raw=true)

This extension lets you autofill the form when booking you bouldering timeslot at the Beta bouldering gym in Hanover.
Your can enter your booking information on the options page of this extension. Your data is saved locally on your
device and not uploaded or shared with anyone.

![Beta-Booking Options Image](readme_images/beta-booking-options.png?raw=true)

As of now the extension assumes you have a monthly subscription to the gym and preselects this option for you. If you
have a different subscription/payment method you will have to configure that manually when booking for now, sorry!

## How To
Before the extension can autofill anything, you have to tell it what to autofill. Click on the configure link and
save your booking info.
To book your timeslot navigate to the [booking page](https://boulderhalle-beta.de/corona) of the Beta bouldering gym
and select a timeslot. Then click on the extension icon in the action bar and click *Fill Form*.

## Browsers
This extension was specifically tested on Firefox and Chrome.
It was programmed for use in Firefox first, which is why Chrome uses the [Webextension Polyfill](https://github.com/mozilla/webextension-polyfill)
provided by Mozilla.

### Firefox
You can install this extension from the firefox extension store: https://addons.mozilla.org/en-US/firefox/addon/beta-booking/?src=search  
Alternatively you can clone the repository and test it locally by navigating to `about:debugging` in Firefox and select
*This Firefox* -> *Load Temporary Add-on...* and select the *manifest.json* file of this extension.

### Chrome
If you want to test this extension locally using Chrome, navigate to `chrome://extensions`, click on *Load Unpacked*
and select the directory of this extension. 

## Icons
The icons used are created by [Chanut-is](https://www.iconfinder.com/Chanut-is) and used under the [Creative Commons License](https://creativecommons.org/licenses/by/3.0/)
