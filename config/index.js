//es6 import dotenv and config from file stored to var devConfig
import dotenv from 'dotenv';
import devConfig from './dev.config.js';

dotenv.config();

let config;
//tells the application which type of environment to run
switch (process.env.NODE_ENV) {
    case 'production':
        //todo
        throw new Error("production env not configured");
        break;
    case 'test':
        //todo
        throw new Error("test env not configured");
        break;
    //sets the config to devConfig(config from file)
    default:
        config = devConfig;
        break;
}

//pulls the info from the .env file and stores into these var
config.secret = process.env.SECRET;
config.port = process.env.PORT;
config.node = process.env.NODE_ENV;

//es6 default export tow jwt.js and index.js
export default config;

