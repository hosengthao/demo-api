//import default jsonwebtoken and store into jwt
import jwt from 'jsonwebtoken';
//stores secret encryptor code into var 'secret'
const secret = 'my-secret';

//es6 export of async function 'createToken'
export async function createToken(userID) {
    //uses the sign function from jwt to take the user.id from the controller query to create a valid token (valid for 1 year) and store it into var 'token'.
    const token = await jwt.sign({id:userID}, secret, {expiresIn:'1y'});
    return token;
}
//es6 export of async function 'readToken'
export async function readToken(token) {
    //use the verify function from jwt to verify the token using the secret encryptor code and store it into var 'user'
    const user = await jwt.verify(token, secret);
    return user;
}
