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
                table.integer("foundation_year");
                table.text("desc");
                table.specificType("images", "TEXT[]");
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
                table.text("achievements");
                table.specificType("images", "TEXT[]");
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
 * id Integer
 * returns Artists
 **/
exports.companyIdArtistsGET = function(id) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("artist")
                .select()
                .where("affiliation", id)
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
        try {
            return sqlDb("artist")
                .select()
                .first()
                .where("id", id)
                .timeout(2000, {cancel: true})
                .then(artist => {
                    if (artist) {
                        resolve(artist);
                    }
                    else {
                        reject({error: "Artist not found (unknown id)", code: 404});
                    }
                });
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
 * returns Artists
 **/
exports.artistsGET = function() {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("artist")
                .select()
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
 * returns Companies
 **/
exports.companiesGET = function() {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("company")
                .select()
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
        try {
            return sqlDb("company")
                .select()
                .first()
                .where("id", id)
                .timeout(2000, {cancel: true})
                .then(company => {
                    if (company) {
                        resolve(company);
                    }
                    else {
                        reject({error: "Company not found (unknown id)", code: 404});
                    }
                });
        }
        catch (e) {
            reject(e);
        }
    });
};


/**
 * Get events of given company
 * Returns all events in which the company participate
 *
 * id Integer
 * returns Events
 **/
exports.companyIdEventsGET = function(id) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("performed_by_company")
                .innerJoin("event", "event.id", "performed_by_company.event_id")
                .select()
                .where("company_id", id)
                .timeout(2000, {cancel: true});

            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
};


/**
 * Get events of given artist
 * Returns all events in which the artist participate
 *
 * id Integer
 * returns Events
 **/
exports.artistIdEventsGET = function(id) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("performed_by_artist")
                .innerJoin("event", "event.id", "performed_by_artist.event_id")
                .select()
                .where("artist_id", id)
                .timeout(2000, {cancel: true});

            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
};
