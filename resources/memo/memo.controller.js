//es6 named import for 'query' from db.js file
import {query} from "../../lib/db.js";

//asynchronous function to post(create). 2 variables are created req(request) and res (response)
async function post(req, res) {
    //create new const 'cql' and set it = cql code
    //cql code inserts the values into table called hthao.name in the order of id, then content
    //id is set to a function "now()" and content is set to a variable "?". This ? helps to prevent SQL/CQL injection from outside
    const cql = `
        INSERT INTO hthao.memo_by_user (id, create_timestamp, user_id, content, tag)
        VALUES(now(), toTimestamp(now()), ?, ?, ?);
    `;
    //creates a constant array called params. this will replace the "?" in the above statement
    //this params is set to the what is listed under content in the body of the request
    const params = [
        req.body.user_id,
        req.body.content,
        req.body.tags
    ]
    //try and catch is for catching errors. It will run through the try statement first and then if there is an error it will catch it.
    try {
        //this will wait for the 'query' function from the db.js to run with the conditions we set above on our cassandra server
        await query(cql, params)
        //this will send a response message back to the requester
        res.send({
            message: "created"
        });
    //this will catch any errors that we come across and respond with a status code of 500 and
    } catch (error) {
        res.status(500).send({
            message: "error"
        });
    }
}

//asynchronous function to get all rows from the table called hthao.memo with a limit to 500 rows
async function getAll(req, res){
    const cql = `
        SELECT * FROM hthao.memo_by_user WHERE user_id = ?;
    `;
    //there are no parameters because we are returning all rows without any conditions
    const params = [
        req.body.user_id
    ];
    //creates a variable called 'memoList' to store the 'query' function from db.js
    try {
        let memoList = await query(cql, params)
        //send the results back in a response through the variable memoList
        res.send({
            memo_list: memoList
        });
    } catch (error) {
        res.status(500).send({
            message: "error"
        });
    }
}

//async function to get the row by the specific id from table hthao.memo where the id is a parameter
async function getById(req, res) {
    const cql = `
        SELECT * FROM hthao.memo_by_user WHERE id= ? AND user_id = ? AND create_timestamp = ?;
    `;
    //new variable params is = the id from the URL
    const params = [
        req.params.id,
        req.body.user_id,
        new Date(req.body.create_timestamp)
    ];

    try {
        let memoList = await query(cql, params);
        //this will only take the 1st object in the array to display
        res.send({
            memo: memoList[0]
        });
    } catch (error) {
        //if the error code is 8704 display 'invalid id'. basically if requester inputs the wrong id in the URl it will give this error
        if (error.code === 8704) {

            res.status(400).send({
                message: 'invalid id'
            });
            return;
        }
        res.status(500).send({
            message: "error"
        });
    }
}

//async function to update the content a row on the table hthao.memo by the specific id where both the content and id are variables.
async function put(req, res) {
    const cql = `
        UPDATE hthao.memo_by_user SET content = ? WHERE id= ? AND create_timestamp = ? AND user_id = ?;
    `;
    //since we have two ?'s and content is the first "?" then the first item in our array has to be for the content variable.
    //content variable comes from content section in the body from the request
    //id variable comes from the id in the URL
    const params = [
        req.body.content,
        req.params.id,
        new Date(req.body.create_timestamp),
        req.body.user_id
    ];

    try {
        await query(cql, params);
        res.send({
            message: "updated"
        });
    } catch (error) {
        if (error.code === 8704) {
            res.status(400).send({
                message: 'invalid id'
            });
            return;
        }
        res.status(500).send({
            message: "error"
        });
    }
}

//async function to delete a row from the table based on a specific id
async function del(req, res) {
    const cql = `
        DELETE FROM hthao.memo_by_user WHERE id= ? AND create_timestamp = ? AND user_id = ?;
    `;
    //the id variable comes from the URL
    const params = [
        req.params.id,
        new Date(req.body.create_timestamp),
        req.body.user_id
    ];

    try {
        await query(cql, params);
        res.send({
            message: "deleted"
        });
    } catch (error) {
        if (error.code === 8704) {
            res.status(400).send({
                message: 'invalid id'
            });
            return;
        }
        res.status(500).send({
            message: "error"
        });
    }
}

//default export for all of the functions listed below. exported to the router.
export default {
    post,
    getAll,
    getById,
    put,
    del,
}