# moodu_frontend
Ionic v2 Android / iOS App for music curation

Installation
============

- Ensure you're running macOS Sierra


## Install NodeJS

1. Enter https://nodejs.org/dist/v6.11.2/node-v6.11.2.pkg into your browser of your choice.
2.  Open node-v6.11.2.pkg once the download is finished by double-clicking on the file in your filesystem.
3.  Click Continue
4.  Select your language.
5.  Click continue
6.  Read license
7.  Click agree
8.  Choose which users to install node for.
9.  Click Continue
10. Use default install location or choose another one.
11.  Click Install.
12.  Enter your system password into the prompt "Installer is trying to install new software".  Click ok.
13.  Note where node was installed and click close.
14.  NodeJS is now installed.

## Install Ionic and its dependencies

(Taken from https://ionicframework.com/docs/intro/installation/)

1.  Open a terminal by pushing command+space and typing "terminal" once the Spotlight Search opens or by whatever means you prefer.
2.  Make sure your ~/.npmrc doesn't have any custom npm registry entries.
3.  Enter the command `npm install -g ionic cordova` in your terminal and hit your return key.

### Install or upgrade XCode
Follow instructions at https://cordova.apache.org/docs/en/latest/guide/platforms/ios/

### Install or upgrade the the SDK and/or Android Studio
Follow instructions at https://cordova.apache.org/docs/en/latest/guide/platforms/android/



## Install git

Follow instructions at https://git-scm.com/book/en/v2/Getting-Started-Installing-Git.


## Clone the frontend code repository

```
git clone https://github.com/thecreativesgroup/moodu_frontend.git
```

## Install the dependencies for the frontend using npm.

Dependencies listed in package.json.  Make sure you have access to all of the repositories in git.

```bash
cd moodu_frontend
npm install
```


Running/Debugging
=================

From the root of your recently clone moodu_frontend repository, enter the following command:

```
ionic serve
```

If it asks you to install a local version of ionic CLI, do it by pushing `Y` then `return`.  If asked to check for updates, make your choice and hit `return`.  I chose `Y`. If there are updates, go ahead and accept the updates by pushing `Y` and hitting `return`.


### Running in an emulator

```
ionic cordova emulate ios
```

You may see an issue with CDVPlugin.h.  If that's the case, run 
```
cordova platform remove ios
cordova platform add ios
ionic cordova emulate ios
```

### Running on a real device

```
ionic cordova run ios
```

or

```
ionic cordova run android
```

### Running in the browser (Don't use Cordova and fake your credentials by setting the session manually.)

At any rate, eventually you'll run `ionic serve`.  You'll find that you get an error saying that "Uncaught (in promise): ReferenceError: cordova is not defined."  This is because Cordova only runs on an emulator or device, NOT IN YOUR BROWSER.  To develop using ionic serve in your browser (useful for CSS/html changes and saves battery life without having to run the emulator), you can comment out the code that uses cordova to log in.  This code is in home.ts.  It is currently on lines 73-80 and starts with `if (this.accessTokenService.getAccessToken() == null ||`.  Comment those lines.  Uncomment the lines 64-71 (to set your service token and current user) and uncomment line 81 so that you can load a page.  This is what I use when creating a new page and just want to get the HTML/CSS written.  Line 85, the contents of goToPageBeingTested, can decide which page is loaded when ionic serve loads the app in the browser.  The main root page to use is `TabsPage`.  

e.g. ```goToPageBeingTested() {
    this.navCtrl.setRoot(TabsPage);
  }```
  
  Note that server calls won't work because we're not actually authenticated.  You have to run the app through the emulator or device to get a real spotify access token.

Anyway, comment out and recomment the code that you just changed to get things to work in the browser and run things in an emulator now.






Check ionic v2 documentation
