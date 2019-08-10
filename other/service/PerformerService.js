'use strict';


/**
 * Get artists affiliated to a company
 * Returns all artists affiliated to company with given id
 *
 * company id Integer 
 * returns Artists
 **/
exports.artistCompanyIdGET = function(company id) {
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
 * Get a single artist
 * Returns an artist for its id
 *
 * id Integer 
 * returns Artist
 **/
exports.artistIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 0,
  "name" : "John",
  "surname" : "Padella",
  "achievements" : "• 2015 artist awards   • Time people list of 2016",
  "profession" : "musician"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


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
 * Get companies list
 * Returns list of companies
 *
 * size Integer Number of items returned in a page, default is 10 (optional)
 * page Integer Selected page to return, default is 0 (optional)
 * returns Companies
 **/
exports.companiesGET = function(size,page) {
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
 * Get a single company
 * Returns a company for its id
 *
 * id Integer 
 * returns Company
 **/
exports.companyIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 0,
  "name" : "The Jojos",
  "group type" : "music ensemble",
  "foundation date" : "03-06-1997",
  "desc" : "Description about this invented group"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

