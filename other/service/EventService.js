'use strict';

let eventJson = require("../data/eventData.json");
let reservationJson = require("../data/reservationData.json");

let sqlDb;

exports.eventDbSetup = function(database) {
  // set local reference to database
  sqlDb = database;
  let tableName = "event";
  return database.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      return database.schema.createTable(tableName, table => {
        table.increments("id").primary();
        table.text("name");
        table.text("location");
        table.date("date");
        table.text("desc");
        table.text("fact_sheet");
        table.enum("type", ["music", "theater", "opera", "dance"]);
        table.specificType("images", "TEXT[]");
        table.integer("seminar_id").index().references("id").inTable("seminar").nullable();
        console.log(`${tableName} database created`);
      }).then(() => {
          return Promise.all(
              eventJson.map(e => {
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

exports.reservationDbSetup = function(database) {
  // set local reference to database
  sqlDb = database;
    let tableName = "reservation";
    return database.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      return database.schema.createTable(tableName, table => {
        table.integer("event_id").index().references("id").inTable("event");
        table.text("user_email").index().references("email").inTable("usr");
        table.integer("tickets");
        table.primary(["event_id", "user_email"]);
        console.log(`${tableName} database created`);
      }).then(() => {
          return Promise.all(
              reservationJson.map(e => {
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
 * Get events list
 * Returns list of events
 *
 * type (String) Type filter to apply (optional)
 * date (String) Date filter to apply (optional)
 * location (String) Location filter to apply (optional)
 * returns Events
 **/
exports.eventsGET = function(type,date,location) {
  return new Promise(function(resolve, reject) {
    let result;
    try {
      result = sqlDb("event")
          .select()
          .modify((query) => {
              if (type) {
                  query.where("type", type)
              }
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
 * Get a single event
 * Returns an event for its id
 *
 * id Integer 
 * returns Event
 **/
exports.eventsIdGET = function(id) {
    return new Promise(function(resolve, reject) {
        try {
            return sqlDb("event")
                .select()
                .first()
                .where("id", id)
                .timeout(2000, {cancel: true})
                .then(event => {
                    if (event) {
                        resolve(event);
                    }
                    else {
                        reject({error: "Event not found (unknown id)", code: 404});
                    }
                });
        }
        catch (e) {
            reject(e);
        }
    });
};


/**
 * Get event's artists
 * Returns all artists that participate to event
 *
 * id Integer
 * returns Artists
 **/
exports.eventsIdArtistsGET = function(id) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("performed_by_artist")
                .innerJoin("artist", "artist.id", "performed_by_artist.artist_id")
                .select()
                .where("event_id", id)
                .timeout(2000, {cancel: true});

            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
};


/**
 * Get event's companies
 * Returns all companies that participate to event
 *
 * id Integer
 * returns Companies
 **/
exports.eventsIdCompaniesGET = function(id) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("performed_by_company")
                .innerJoin("company", "company.id", "performed_by_company.company_id")
                .select()
                .where("event_id", id)
                .timeout(2000, {cancel: true});

            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
};