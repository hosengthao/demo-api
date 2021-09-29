//es6 default import cassandra-driver (node module) into var called cassandra
import cassandra from'cassandra-driver';
import config from '../config/index.js';


//new var 'client' = database with contactPoint = ip address, localDataCenter = default, keyspace = specific database
const client = new cassandra.Client({
    contactPoints: config.db.contactPoints,
    localDataCenter: config.db.localDataCenter,
    keyspace: config.db.keyspace
});

//es6 export of async function 'query'. creates 2 variables query and params. Exports to the controller
export async function query(query, params) {
    try {
        //Run the query(var) on the client(db we just created above) and store it into new var 'result'
        let result = await client.execute(query, params);
        //return the rows property of the result(var)
        return result.rows;
    } catch (error){
        console.log(error);
        //throws the error to the next level
        throw error;
    }
}
