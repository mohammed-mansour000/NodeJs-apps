var config = require("./dbConfig");
var sql = require("mssql");
const mysqlConnection = require('./connection');

async function getBroadcasts(){
    try{
        let pool = await sql.connect(config);
        let broadcasts = await pool.request().query("select * from broadcast");
        return broadcasts.recordsets;
    }catch(err){
        console.log(err);
    }
}


async function getEvents(){
    try{
        let pool = await sql.connect(config);
        let events = await pool.request().query("select * from event");
        return events.recordsets;
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    getBroadcasts : getBroadcasts,
    getEvents : getEvents,
}