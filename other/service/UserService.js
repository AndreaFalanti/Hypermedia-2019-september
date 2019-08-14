'use strict';

let sqlDb;

exports.userDbSetup = function(database) {
  // set local reference to database
  sqlDb = database;
  return database.schema.hasTable("usr").then(exists => {
    if (!exists) {
      return database.schema.createTable("usr", table => {
        table.text("email").primary();
        table.text("name");
        table.text("surname");
        table.text("password");
        console.log("User database created");
      });
    }
    else {
      console.log("User database already existing");
    }
  });
};

/**
 * Register
 * Register into the store
 *
 * body User 
 * no response value expected for this operation
 **/
exports.userRegisterPOST = function(body) {
  return new Promise(function(resolve, reject) {
    let result;
    try {
      result = sqlDb("usr")
          .insert(body)
          .timeout(2000, {cancel: true});

      resolve(result);
    }
    catch (e) {
      reject(e);
    }
  });
};


/**
 * Gets a single user
 * Returns a single user for its email
 *
 * email String The user's email
 * returns User
 **/
exports.usersEmailGET = function(email) {
  return new Promise(function(resolve, reject) {
    let result;
    try {
      result = sqlDb("usr")
          .select()
          .where("email", email)
          .timeout(2000, {cancel: true});

      resolve(result);
    }
    catch (e) {
      reject(e);
    }
  });
};


/**
 * Gets some users
 * Returns a list containing all users.
 *
 * size Integer Number of items returned in a page, default is 10 (optional)
 * returns Users
 **/
exports.usersGET = function(size) {
  return new Promise(function(resolve, reject) {
    let result;
    try {
      result = sqlDb("usr")
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
};

