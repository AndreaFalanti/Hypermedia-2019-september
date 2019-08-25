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
 * Get events performed on given date
 * Returns a list of events that are performed on selected date
 *
 * date String 
 * returns Events
 **/
exports.eventsDateDateGET = function(date) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("event")
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
 * Get events list
 * Returns list of events
 *
 * size Integer Number of items returned in a page, default is 10 (optional)
 * page Integer Selected page to return, default is 0 (optional)
 * returns Events
 **/
exports.eventsGET = function(size,page) {
  return new Promise(function(resolve, reject) {
    let result;
    try {
      result = sqlDb("event")
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
 * Get a single event
 * Returns an event for its id
 *
 * id Integer 
 * returns Event
 **/
exports.eventsIdGET = function(id) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("event")
                .select()
                .first()
                .where("id", id)
                .timeout(2000, {cancel: true});

            console.log(result);
            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
};


/**
 * Get events in given location
 * Returns a list of events that are performed at selected location
 *
 * location String 
 * returns Events
 **/
exports.eventsLocationLocationGET = function(location) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("event")
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


/**
 * Get events discussed in selected seminar
 * Returns a list of events that are discussed in given seminar id
 *
 * seminar id String 
 * returns Events
 **/
exports.eventsSeminarIdGET = function(seminar_id) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("event")
                .select()
                .where("seminar_id", seminar_id)
                .timeout(2000, {cancel: true});

            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
};


/**
 * Get events of given type
 * Returns a list of events that match selected performance type
 *
 * performance type String 
 * returns Events
 **/
exports.eventsTypePerformanceTypeGET = function(performance_type) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("event")
                .select()
                .where("type", performance_type)
                .timeout(2000, {cancel: true});

            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
};

