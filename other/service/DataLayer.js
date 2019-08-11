const sqlDbFactory = require("knex");

let { seminarDbSetup } = require("./SeminarService");
let { companyDbSetup, artistDbSetup, performedByCompanyDbSetup, performedByArtistDbSetup } = require("./PerformerService");
let { eventDbSetup, reservationDbSetup } = require("./EventService");
let { userDbSetup } = require("./UserService");


let sqlDb = sqlDbFactory({
    client: "pg",
    connection: process.env.DATABASE_URL || {
        host : "localhost",
        user: 'postgres',
        password: process.argv[2],
        database: 'festival'
    },
    ssl: true,
    debug: true
});

//function used to setup all database tables required
function setupDataLayer() {
    console.log("Setting up data layer...");
    return seminarDbSetup(sqlDb) &&
        companyDbSetup(sqlDb) &&
        artistDbSetup(sqlDb) &&
        eventDbSetup(sqlDb) &&
        userDbSetup(sqlDb) &&
        reservationDbSetup(sqlDb) &&
        performedByArtistDbSetup(sqlDb) &&
        performedByCompanyDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDataLayer };