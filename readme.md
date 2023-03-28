# MySQL Node.js Express app

This app is made following this tutorial: 

Video: 
https://www.youtube.com/watch?v=Hej48pi_lOc&list=RDCMUC6aTLuI_j4-0wiDSzmaPctQ&start_radio=1

Article: 
https://www.sammeechward.com/connect-to-mysql-from-node 




## helper libraries

### dotenv
We use dotenv library to create local env variables to keep things hidden.  This library allows our app (database.js) to "see" the '.env' file and read from it.  

### Thunder Client VSCode extension
I use Thunder Client VSCode extension to test my endpoints

### nodemon 
This plugin refreshes the dev server automatically 

## how to use this code
- download or clone this repo
- run npm install 
- run npm run dev (this will start the dev server which refreshes with nodemon)