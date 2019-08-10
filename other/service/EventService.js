'use strict';


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
exports.eventsSeminarIdGET = function(seminar id) {
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
exports.eventsTypePerformanceTypeGET = function(performance type) {
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

