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
async function setupDataLayer() {
    console.log("Setting up data layer...");
    return await seminarDbSetup(sqlDb) &&
        await companyDbSetup(sqlDb) &&
        await artistDbSetup(sqlDb) &&
        await eventDbSetup(sqlDb) &&
        await userDbSetup(sqlDb) &&
        await reservationDbSetup(sqlDb) &&
        await performedByArtistDbSetup(sqlDb) &&
        await performedByCompanyDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDataLayer };