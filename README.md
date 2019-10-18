
##Settlement UI

The primary aim of Settlement User Interface is to provide a simple and friendly user interface to processing product files sent by Processors to Banks. This is dependent on the Settlement App Backend.

## Core Features

1. Settlment of Accounts per Products
2. Handling of critical banking application of verifying product submissions from external processors.
3. Giving insights into product/account perfomances, trends and analysis.

## System Requirments
* Node >= 6 
* npm >= 5.2

## Why Bother About System Requirements... Docker Way...

``` bash

# clone the repo
$ git clone https://github.com/.... settlement-ui

# then go into app's directory
$ cd settlement-ui

* Just ensure docker is up and running on your system and check by running in your terminal or command prompt docker -v
* docker build -t activedge/settlement_app .
* docker run -p 3005:3005 -v /usr/src/settlement_app/node_modules -v$(pwd):/usr/src/settlement_app activedge/settlement_app

Navigate to [http://localhost:3005](http://localhost:3005) provided that port was vacant

... but if you prefer build/run the settlement app 1960 way :disappointed_relieved:

## Building / Running the Settlement Ui App


# install app's dependencies
$ npm install

# start the application
$ npm start
```
Navigate to [http://localhost:3000](http://localhost:3000) if hosted locally or update your host accordingly. The app will automatically reload if you change any of the source files.

### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build
```


##### ==> Built and managed by Active Edge Technologies
# ae_sett_app
