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

const getUsers = () => new Promise((resolve, reject) => {
    db_connection.query('SELECT * FROM USERS', (err, results) => {
      if (err) console.error(err);
      console.log('User Query Results: ', results);
      resolve(results);
      db_connection.end(err => { if (err) console.error(err) });
    });
  });

module.exports = {
    getBroadcasts : getBroadcasts,
    getEvents : getEvents,
}