//import default jsonwebtoken and store into jwt and config from file and store as var 'config'
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

//es6 export of async function 'createToken'
export async function createToken(userID) {
    //uses the sign function from jwt to take the user.id from the controller query to create a valid token (valid for 1 year) and store it into var 'token'. secret comes from config file which comes from .env
    const token = await jwt.sign({id:userID}, config.secret, {expiresIn:'1y'});
    return token;
}
//es6 export of async function 'readToken'
export async function readToken(token) {
    //use the verify function from jwt to verify the token using the secret encryptor code and store it into var 'user' again using the secret from config file which gets it from .env
    const user = await jwt.verify(token, config.secret);
    return user;
}

//es6 export for async function 'auth'. exported to index.js. sets 3 var 'req', 'res' and 'next'
export async function auth(req, res, next) {
    try {
        //takes the token which is stored in header and splits it at the "space" and takes the second part(token) and stores it to var 'token'
        const token = req.headers.authorization.split(' ')[1];
        //runs the readToken function from above and stores the result into var 'user'
        const user = await readToken(token);
        //makes sure the user.id and user_id from request are the same
        req.body.user_id = user.id
        //moves on to the next item/function
        next();
    } catch (error) {
        res.status(401).send({
            message: "invalid token"
        });
    }
}