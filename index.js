//ES6 expression to import express and store it to function called 'express'. Express is a node module or application framework that provides a robust set of features or tools for HTTP servers.
import express from 'express';
//import memo.router.js and store it as variable 'memoRouter'
import memoRouter from './resources/memo/memo.router.js';
//import morgan and store it as function 'morgan'. Morgan is a HTTP request logger middleware
//middleware is something that stands between the logic, in this case index.js, and functionality such as router/controllers
import morgan from 'morgan';
//import user.router.js and store it as variable 'userRouter'
import userRouter from './resources/user/user.router.js';
//import named export from jwt file
import {auth} from './lib/jwt.js';
//import config from config/index.js
import config from './config/index.js';


//creates a constant called app and set it = the express function
const app = express();

//this uses express to mount(use) the specified middleware function to the specified path. Since these two are mounted without a path, these will be ran for every request to the app.
//converts body to json first
app.use(express.json());
//uses morgan to do some logging. morgan format stored in config/index.js
app.use(morgan(config.morgan_format));


app.use('/api/user', userRouter);
//then runs auth middleware
app.use(auth);

//this uses express to mount the middleware (memoRouter and userRouter) to the respective paths. Now we can open those paths in our URL to use those routers.
app.use('/api/memo', memoRouter);


//this will use express to listen to port 3000 (localhost:3000) for any activity. port location and env type stored in .env file
app.listen(config.port, () => {
    console.log(`server running | on port ${config.port} | ${config.node}`);
});