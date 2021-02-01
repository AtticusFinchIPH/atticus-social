# atticus-social
Social web application with several simple functions as Facebook.
In lastest version, we have three main pages:
1. Login page
2. Home page
3. Newsfeed
<!---->
You can all so interact with other by following, liking, commenting other posts.
Blog page, chat function and others may not be completed yet...

## Run locally
### Setup environment variables
To run this project in your local, you have to provide a .evn file. Draft version can be found in .evn.sample file.  
However, in order to store images, I use Cloudinary (a free cloud service) that need an acount. You should create one and provide your own api key and api secret.
If not, the application still runs without images uploading function as a downside.  
You can also change other environment variables as you like or leave as default.  

### Run application
First way:  
Start backend in cmd: $ npm run server => Now, your server will start at your localhost in port 5000 as my default.  
Start frontend in cmd: $ cd frontend && npm start => Your frontend start at localhost in port 3000 as default of create-react-app.  
Second way:  
I installed globally a npm package name [Concurrently](https://www.npmjs.com/package/concurrently) to run simultaneously server and client side (in dev mode). You can install it globally like me or locally into this project only, Then you can use this single command to run both server and client side:  
npm start
$ npm start