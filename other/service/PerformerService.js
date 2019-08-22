'use strict';

let companyJson = require("../data/companyData.json");
let artistJson = require("../data/artistData.json");
let perfCompanyJson = require("../data/perfCompanyData.json");
let perfArtistJson = require("../data/perfArtistData.json");

let sqlDb;

exports.companyDbSetup = function(database) {
    // set local reference to database
    sqlDb = database;
    let tableName = "company";
    return database.schema.hasTable(tableName).then(exists => {
        if (!exists) {
            return database.schema.createTable(tableName, table => {
                table.increments("id").primary();
                table.text("name");
                table.enum("type", ["music ensemble", "theater company", "dance company"]);
                table.date("foundation_date");
                table.text("desc");
                console.log(`${tableName} database created`);
            }).then(() => {
                return Promise.all(
                    companyJson.map(e => {
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

exports.artistDbSetup = function(database) {
    // set local reference to database
    sqlDb = database;
    let tableName = "artist";
    return database.schema.hasTable(tableName).then(exists => {
        if (!exists) {
            return database.schema.createTable(tableName, table => {
                table.increments("id").primary();
                table.text("name");
                table.text("surname");
                table.integer("affiliation").index().references("id").inTable("company").nullable();
                table.enum("type", ["musician", "dancer", "actor", "singer"]);
                table.text("desc");
                console.log(`${tableName} database created`);
            }).then(() => {
                return Promise.all(
                    artistJson.map(e => {
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

exports.performedByArtistDbSetup = function(database) {
    // set local reference to database
    sqlDb = database;
    let tableName = "performed_by_artist";
    return database.schema.hasTable(tableName).then(exists => {
        if (!exists) {
            return database.schema.createTable(tableName, table => {
                table.integer("event_id").index().references("id").inTable("event");
                table.integer("artist_id").index().references("id").inTable("artist");
                table.primary(["event_id", "artist_id"]);
                console.log(`${tableName} database created`);
            }).then(() => {
                return Promise.all(
                    perfArtistJson.map(e => {
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

exports.performedByCompanyDbSetup = function(database) {
    // set local reference to database
    sqlDb = database;
    let tableName = "performed_by_company";
    return database.schema.hasTable(tableName).then(exists => {
        if (!exists) {
            return database.schema.createTable(tableName, table => {
                table.integer("event_id").index().references("id").inTable("event");
                table.integer("company_id").index().references("id").inTable("company");
                table.primary(["event_id", "company_id"]);
                console.log(`${tableName} database created`);
            }).then(() => {
                return Promise.all(
                    perfCompanyJson.map(e => {
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
 * Get artists affiliated to a company
 * Returns all artists affiliated to company with given id
 *
 * company id Integer
 * returns Artists
 **/
exports.artistCompanyIdGET = function(company_id) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("artist")
                .select()
                .where("affiliation", company_id)
                .timeout(2000, {cancel: true});

            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
};


/**
 * Get a single artist
 * Returns an artist for its id
 *
 * id Integer
 * returns Artist
 **/
exports.artistIdGET = function(id) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("artist")
                .select()
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
 * Get artists list
 * Returns list of artists
 *
 * size Integer Number of items returned in a page, default is 10 (optional)
 * page Integer Selected page to return, default is 0 (optional)
 * returns Artists
 **/
exports.artistsGET = function(size,page) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("artist")
            //.innerJoin("company", "artist.affiliation", "company.id")
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
 * Get companies list
 * Returns list of companies
 *
 * size Integer Number of items returned in a page, default is 10 (optional)
 * page Integer Selected page to return, default is 0 (optional)
 * returns Companies
 **/
exports.companiesGET = function(size,page) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("company")
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
 * Get a single company
 * Returns a company for its id
 *
 * id Integer
 * returns Company
 **/
exports.companyIdGET = function(id) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("company")
                .select()
                .where("id", id)
                .timeout(2000, {cancel: true});

            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
};

