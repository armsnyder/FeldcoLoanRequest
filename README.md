# Feldco Loan Request App

The Feldco Loan Request App is a Feldco in-house mobile application designed for tablet devices that streamlines the loan application process. Sales representitives may fill out digital application forms with the customer's help and receive immediate responses from banks without the need for a call center to act as a middleman.

## Current Features

* Sales representatives can log into a tablet application
* Sales representatives can see a list of their clients and select the client with whom they are filling out an application
* The client can see and complete a supplement form
* The signed supplement form is sent to a backend server and kept as a record
* The sales representative, with the help of their client, can fill out a bank application form
* The application form information is validated before being sent to banks
* The completed bank application form is sent to a backend server
* If the loan is approved by Feldco Finance, the sales representative can view Truth in Lending information
* An administrator can modify the order (routing) in which banks receive a client's loan application
* Loan applications are sent to banks based on a qualifying criteria matrix, which takes into account things like the loan amount and client residence type

## Instructions for Continuing Development

You (Feldco) will likely want to continue developing this application. Here are some detailed instructions to guide your development team.

### Download and Installation

There are some steps required to set up the frameworks used to develop the application and configure a backend server.

#### Setting up AppGyver Steroids

We built this mobile application using the AngularJS and AppGyver Steroids frameworks. There are some steps required to get everything set up.

1. [Create an AppGyver account](http://www.appgyver.com/steroids_sign_up)
2. Make sure develloper tools are set up ([Click here](https://academy.appgyver.com/installwizard/steps#/home) for a guide)

#### Downloading Source Code and Dependencies

1. [Click here](https://github.com/eecs394-spr15/FeldcoLoanRequest/archive/master.zip) to download source code
2. Unzip the code and place it in your desired directory
3. Open the Command Line (Windows) or Terminal (OSX) in the FeldcoLoanRequest root directory and run:
```
steroids update
```

#### Setting Up Backend Server

The mobile app sends all http requests to a backend server that we developed using the [Express](http://expressjs.com/) framework. This server is currently hosted on Amazon Web Services. For now, you have the option to either host this server on your own Amazon account or locally at Feldco. There are other options you may want to pursue, which are discussed in the [Going Forward](https://github.com/eecs394-spr15/FeldcoLoanRequest#going-forward) section below.

##### Hosting on Amazon Web Services

[INCOMPLETE]

##### Hosting at Feldco

[INCOMPLETE]

### Developing the App

We recommend that you read through the basic [AppGyver Steroids documentation](http://docs.appgyver.com/supersonic/tutorial/first-mile/#overview), noting of course that you can skip the setup steps.

To test the code, open the Command Line (Windows) or Terminal (OSX) in the FeldcoLoanRequest root directory and run:
```
steroids connect
```
A web page will open containing a QR code that you may scan using the [AppGyver Scanner app](https://play.google.com/store/apps/details?id=com.appgyver.freshandroid&hl=en) on your tablet. You may also open an emulator. Instructions for setting up the GenyMotion Android Emulator can be found [here.](http://docs.appgyver.com/tooling/cli/emulators/genymotion/)

### Code Tour

[INCOMPLETE]

### Deployment

* Follow these guidelines: http://docs.appgyver.com/tooling/build-service/build-settings/build-settings-for-android/
* Once you deploy go to the cloud services using this link: https://cloud.appgyver.com
* While in cloud services, when you're configuring the app make sure you name your key_store_app and alias the same as you named them when you created them.

## Going Forward

[INCOMPLETE]

### Missing Features

Here are a list of features that are missing from the application, along with how we suggest you implement them.

##### Connecting the sales representative login and client list to the Feldco CRM

##### Saving the completed supplement forms as PDFs

##### Maintaining records of loan applications

##### Connecting the submitted application forms to real bank APIs.

[INCOMPLETE]

### Known Issues

* The app sends all form data to a backend server using an unencrypted http protocol. Since confidential client information is among the form data, we highly recommend securing this connection. This can be accomplished by cutting out the backend server that we developed and sending all communication directly and securely to the Feldco API.

* The app occasionally crashes when changing views if it is run with the Android AppGyver Scanner. However, when deployed, the app works fine.

[INCOMPLETE]

[INCOMPLETE]
