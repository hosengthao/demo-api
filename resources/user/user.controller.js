//es6 named import for 'query' from db.js file and create token from jwt.js file
import {query} from "../../lib/db.js";
import {createToken} from "../../lib/jwt.js";

//asynchronous function 'login'. created 2 variables req(request) and res(response)
async function login(req, res) {
    //create var cql and set to cql code
    //select all from table hthao.user where username is a variable
    //allow filtering so that we can use username(which is not a primary key) to search
    const cql = `
        SELECT * FROM hthao.user WHERE username = ? ALLOW FILTERING;
    `;
    //take the username from the body of the request and set it to new var 'params'
    const params = [
        req.body.username
    ]
    //this is a try and catch for the functions below
    try {
        //it will run the function 'query' from db.js and store the result into new var userList
        //set 'user' = the first object in userList array
        const userList = await query(cql, params)
        const user = userList[0];
        console.log(user);
        //if the password from the request body does not match the password in user.pass then display message
        if (req.body.password !== user.pass) {
            return res.send({
                message: 'invalid login'
            })
        }
        //calls the createToken function from the jwt.js and stores it into var 'token'
        const token = await createToken(user.id);
        //send the token as a response
        res.send({
            token: token
        });
    } catch (error) {
        //send error if the try part does not work
        res.status(500).send({
            message: "error"
        });
    }
}

//async function 'create' created 2 variables req(request) and res(response). this is to create a new user.
async function create(req, res) {
    //stores cql code into 'cql'. Id is stored as a function now(), username and pass are variables
    const cql = `
        INSERT INTO hthao.user (id, username, pass)
        VALUES(now(), ?, ?);
    `;
    //stores the username and password from the request body into the params array. Order does matter as it correlates to the cql code above
    const params = [
        req.body.username,
        req.body.password
    ]
    //runs the 'query' function from db.js with the conditions and parameters above
    try {
        await query(cql, params)
        res.send({
            message: "created"
        });

    } catch (error) {
        res.status(500).send({
            message: "error"
        });
    }
}

//es6 default export to the user.router
export default{
    login,
    create
}