                                                  Survee

An application to send surveys to different email ids by allowing user to provide multiple emails.
Implemented using react /redux.
Tech Stack:MERN with Redux for state management.

heroku url : https://murtaza-surveyapp.herokuapp.com/

Prerequistes:

git:

        For linux: sudo apt install git
        To verify: git --version
        
node:   https://nodejs.org/en/download/

To check if installed run the following in terminal : 

        node --version
        
if already installed will return a number

npm:

        npm install -g npm@latest

To build locally:

clone the repo:

        git clone https://github.com/murtaza1112/Survee.git
        
move into server directory:
        
        cd server

install all dev dependencies:

        npm install
        
run the application:

        npm run dev

naviagate to http://localhost:3000 on your desired browser.

P.S - To run application (in development mode) all API Keys must be provided as mentioned in prod.js file in config directory: 

create dev.js file in config directory and add following code : 

        module.exports = {
          googleClientID: ,

          googleClientSecret: ,

          mongoURI: ,

          cookieKey: "mu12314124",

          stripePublishableKey: ,

          stripeSecretKey: ,

          sendGridKey: ,

          redirectDomain: "http://localhost:3000"
        };


Values for each of the above key value pairs : 

1.Get google api keys by logging in the google developer console.

2.Get monoURI using online mongodb.

3.Stripe keys will be obtainable by creating an account in official stripe website.

4.Sendgrid key will be avaiable by creating an account on sendgrid .(Have to provide proper details for new users such as project
name,purpose of project creation etc)

Note - For testing , to add credits in account use dummy values for credit card info for the credit card number enter ,

  4242 4242 4242 4242
  
 To send mail to recipients , add mails in succession using commas.
  
 ex - murtaza1112@hotmail.com , testingapp@gmail.com , punsagarv@hotmail.com
