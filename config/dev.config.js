//stores the morgan_format and db information into var 'config'
const config = {
    morgan_format: 'dev',
    db: {
        contactPoints: ['3.132.60.209'],
        localDataCenter: 'datacenter1',
        keyspace: 'hthao'
    }

}

//es6 default export to config/index.js
export default config;