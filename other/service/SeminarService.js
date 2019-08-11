'use strict';

let sqlDb;

exports.seminarDbSetup = function(database) {
  // set local reference to database
  sqlDb = database;
  return database.schema.hasTable("seminar").then(exists => {
    if (!exists) {
      return database.schema.createTable("seminar", table => {
        table.increments("id").primary();
        table.text("title");
        table.text("location");
        table.date("date");
        table.text("desc");
        console.log("Seminar database created");
      });
    }
    else {
      console.log("Seminar database already existing");
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
 * Get seminars list
 * Returns list of seminars
 *
 * size Integer Number of items returned in a page, default is 10 (optional)
 * page Integer Selected page to return, default is 0 (optional)
 * returns Seminars
 **/
exports.seminarsGET = function(size,page) {
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
 * Get a single seminar
 * Returns a seminar for its id
 *
 * id Integer 
 * returns Seminar
 **/
exports.seminarsIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 0,
  "title" : "Let's talk about 'Event 0'",
  "date" : "04-08-2019",
  "location" : "Milan",
  "desc" : "Seminar held by our most renowned theater experts"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a list of seminars in given location
 * Returns a list of seminars that will take place in a given location
 *
 * location String 
 * returns Seminars
 **/
exports.seminarsLocationLocationGET = function(location) {
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

