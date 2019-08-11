'use strict';

let sqlDb;

exports.eventDbSetup = function(database) {
  // set local reference to database
  sqlDb = database;
  return database.schema.hasTable("event").then(exists => {
    if (!exists) {
      return database.schema.createTable("event", table => {
        table.increments("id").primary();
        table.text("name");
        table.text("location");
        table.date("date");
        table.text("desc");
        table.text("fact_sheet");
        table.enum("type", ["music", "theater", "opera", "dance"]);
        table.integer("seminar_id").index().references("id").inTable("seminar").nullable();
        console.log("Event database created");
      });
    }
    else {
      console.log("Event database already existing");
    }
  });
};

exports.reservationDbSetup = function(database) {
  // set local reference to database
  sqlDb = database;
  return database.schema.hasTable("reservation").then(exists => {
    if (!exists) {
      return database.schema.createTable("reservation", table => {
        table.integer("event_id").index().references("id").inTable("event");
        table.text("user_email").index().references("email").inTable("usr");
        table.primary(["event_id", "user_email"]);
        console.log("Reservation database created");
      });
    }
    else {
      console.log("Reservation database already existing");
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
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get events list
 * Returns list of events
 *
 * size Integer Number of items returned in a page, default is 10 (optional)
 * page Integer Selected page to return, default is 0 (optional)
 * returns Events
 **/
exports.eventsGET = function(size,page) {
  /*return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });*/
  return new Promise(function(resolve, reject) {
    let result;
    try {
      result = sqlDb("event")
          .select("*")
          .limit(size)
          .timeout(1000, {cancel: true});

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
    var examples = {};
    examples['application/json'] = {
  "id" : 0,
  "name" : "Event 0",
  "location" : "Milan",
  "date" : "03-08-2019",
  "desc" : "short description about event 0",
  "fact sheet" : "• Free coffee   • Theater performance   • Fireworks",
  "performance type" : "theater"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get events in given location
 * Returns a list of events that are performed at selected location
 *
 * location String 
 * returns Events
 **/
exports.eventsLocationLocationGET = function(location) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get events discussed in selected seminar
 * Returns a list of events that are discussed in given seminar id
 *
 * seminar id String 
 * returns Events
 **/
exports.eventsSeminarIdGET = function(seminar_id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get events of given type
 * Returns a list of events that match selected performance type
 *
 * performance type String 
 * returns Events
 **/
exports.eventsTypePerformanceTypeGET = function(performance_type) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

