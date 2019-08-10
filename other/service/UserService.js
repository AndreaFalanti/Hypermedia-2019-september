'use strict';


/**
 * Register
 * Register into the store
 *
 * body User 
 * no response value expected for this operation
 **/
exports.userRegisterPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Gets a single user
 * Returns a single user for its email
 *
 * email String The user's email
 * returns User
 **/
exports.usersEmailGET = function(email) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "email" : "asd@gmail.com",
  "password" : "admin123",
  "firstName" : "Johnny",
  "lastName" : "De Gennaro"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets some users
 * Returns a list containing all users.
 *
 * size Integer Number of items returned in a page, default is 10 (optional)
 * returns Users
 **/
exports.usersGET = function(size) {
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
 * Login
 * Login into the store
 *
 * login Login 
 * no response value expected for this operation
 **/
exports.usersLoginPOST = function(login) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

