'use strict';

let seminarJson = require("../data/seminarData.json");

let sqlDb;

exports.seminarDbSetup = function(database) {
    // set local reference to database
    sqlDb = database;
    let tableName = "seminar";
    return database.schema.hasTable(tableName).then(exists => {
        if (!exists) {
            return database.schema.createTable(tableName, table => {
                table.increments("id").primary();
                table.text("title");
                table.text("location");
                table.date("date");
                table.text("desc");
                console.log(`${tableName} database created`);
            }).then(() => {
                return Promise.all(
                    seminarJson.map(e => {
                        return sqlDb(tableName).insert(e);
                    })
                );
            });
        }
        else {
            console.log(`${tableName} database already existing`);
        }
    });
};


/**
 * Get seminars list
 * Returns list of seminars
 *
 * date (String) Date filter to apply (optional)
 * location (String) Location filter to apply (optional)
 * returns Seminars
 **/
exports.seminarsGET = function(date,location) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("seminar")
                .select()
                .modify((query) => {
                    if (date) {
                        query.where("date", date)
                    }
                    if (location) {
                        query.where("location", location)
                    }
                })
                .timeout(2000, {cancel: true});

            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
};


/**
 * Get a single seminar
 * Returns a seminar for its id
 *
 * id Integer
 * returns Seminar
 **/
exports.seminarsIdGET = function(id) {
    return new Promise(function(resolve, reject) {
        try {
            return sqlDb("seminar")
                .select()
                .first()
                .where("id", id)
                .timeout(2000, {cancel: true})
                .then(seminar => {
                    if (seminar) {
                        resolve(seminar);
                    }
                    else {
                        reject({error: "Seminar not found (unknown id)", code: 404});
                    }
                });
        }
        catch (e) {
            reject(e);
        }
    });
};


/**
 * Get events discussed in selected seminar
 * Returns a list of events that are discussed in given seminar id
 *
 * id String
 * returns Events
 **/
exports.seminarsIdEventsGET = function(id) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("event")
                .select()
                .where("seminar_id", id)
                .timeout(2000, {cancel: true});

            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
};

