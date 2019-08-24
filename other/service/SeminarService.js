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
 * Get a list of seminars on given date
 * Returns a list of seminars that will take place on a given date
 *
 * date String
 * returns Seminars
 **/
exports.seminarsDateDateGET = function(date) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("seminar")
                .select()
                .where("date", date)
                .timeout(2000, {cancel: true});

            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
};


/**
 * Get seminars list
 * Returns list of seminars
 *
 * size Integer Number of items returned in a page, default is 10 (optional)
 * page Integer Selected page to return, default is 0 (optional)
 * returns Seminars
 **/
exports.seminarsGET = function(size,page) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("seminar")
                .select()
                .limit(size || 10)
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
        let result;
        try {
            result = sqlDb("seminar")
                .select()
                .first()
                .where("id", id)
                .timeout(2000, {cancel: true});

            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
};


/**
 * Get a list of seminars in given location
 * Returns a list of seminars that will take place in a given location
 *
 * location String
 * returns Seminars
 **/
exports.seminarsLocationLocationGET = function(location) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("seminar")
                .select()
                .where("location", location)
                .timeout(2000, {cancel: true});

            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
};

