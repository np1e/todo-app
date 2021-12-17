# Local setup

## Install Cloud SDK command line tools

To be able to use emulators and deploy the app(s) to the Google Cloud you need to install the gcloud command line tools. Follow the instructions [https://cloud.google.com/sdk/docs/install|here]. When you're on Linux preferably install from sources instead of using the apt package.

After installing the command line tools you need to initialize them and authenticate: https://cloud.google.com/sdk/docs/initializing

When you're done you should be able to type `gcloud config list` in your terminal and get an output like this:
```[core]
account = uni@nhafkemeyer.com
disable_usage_reporting = False
project = playground-330914

Your active configuration is: [default]
```

## Server

The server app is an Node.js app using the Express framework. Therefore you need Node.js and npm (or yarn) installed. I recommend [https://github.com/nvm-sh/nvm|NVM], which is a version manager for Node.js. It allows you to use different node versions on one system and change between them. When you use nvm you can run `nvm use` or `nvm install` inside the `server` directory. This will set the active node version to the one specified in `server/.nvmrc`, or install it.
 
In the `server` directory run `npm install` to install the dependencies. All following commands should be run inside the `server` directory.

 ### Datastore Emulator

 The app uses Google Cloud Datastore. To avoid needing to connect to the production instance you can use an emulator for local development and testing. First of all you need to install it:
 ```
 gcloud components install cloud-datastore-emulator
 ```

 Run the following command to start the emulator:
 ```
 gcloud beta emulators datastore start --data-dir=.
 ```
 The `data-dir` flag tells the emulator where to store its data. In this case we want it to store it in a `/WEB-INF` directory inside the `server` directory. After starting the emulator you need to set some environment variables so the applications knows to connect to the emulator instead of the production database. To automatically set them run
 ```
 $(gcloud beta emulators datastore env-init --data-dir=.)
 ```

### Start the app

 Now you're ready to start the application itself. Do so by running
 ```
 npm run dev
 ```