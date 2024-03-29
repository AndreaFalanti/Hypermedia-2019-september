'use strict';

let userJson = require("../data/userData.json");

let sqlDb;

exports.userDbSetup = function(database) {
    // set local reference to database
    sqlDb = database;
    let tableName = "usr";
    return database.schema.hasTable(tableName).then(exists => {
        if (!exists) {
            return database.schema.createTable(tableName, table => {
                table.text("email").primary();
                table.text("firstname");
                table.text("lastname");
                table.text("password");
                console.log(`${tableName} database created`);
            }).then(() => {
                return Promise.all(
                    userJson.map(e => {
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
 * Register
 * Register into the store
 *
 * body User
 * no response value expected for this operation
 **/
exports.usersRegisterPOST = function(body) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            return sqlDb("usr")
                .first()
                .where("email", body.email)
                .timeout(2000, {cancel: true})
                .then(user => {
                    if (user) {
                        reject();
                    } else {
                        result = sqlDb("usr")
                            .insert(body)
                            .timeout(2000, {cancel: true});

                        resolve(result);
                    }
                });
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
exports.usersDataGET = function(email) {
    return new Promise(function(resolve, reject) {
        try {
            return sqlDb("usr")
                .select()
                .first()
                .where("email", email)
                .timeout(2000, {cancel: true})
                .then(user => {
                    if (user) {
                        delete user.password;
                        resolve(user);
                    }
                    else {
                        reject({error: "User not found (unknown id)", code: 404});
                    }
                });
        }
        catch (e) {
            reject(e);
        }
    });
};

exports.usersReservationsGET = function(email) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            result = sqlDb("reservation")
                .select()
                .where("user_email", email)
                .innerJoin("event", "event.id", "reservation.event_id")
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
        try {
            return sqlDb("usr")
                .select()
                .where("email", login.email)
                .where("password", login.password)
                .first()
                .timeout(2000, {cancel: true})
                .then(user => {
                    if (user) {
                        resolve(user);
                    } else {
                        reject("Invalid login");
                    }
                });
        }
        catch (e) {
            reject(e);
        }
    });
};


exports.usersReservePOST = function(body, userEmail) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            return sqlDb("reservation")
                .first()
                .where("user_email", userEmail)
                .where("event_id", body.event_id)
                .timeout(2000, {cancel: true})
                .then(reservation => {
                    let record = {event_id: body.event_id, user_email: userEmail, tickets: body.tickets};
                    if (reservation) {
                        result = sqlDb("reservation")
                            .where("user_email", userEmail)
                            .where("event_id", body.event_id)
                            .update(record)
                            .timeout(2000, {cancel: true});

                        resolve(result);
                    } else {
                        result = sqlDb("reservation")
                            .insert(record)
                            .timeout(2000, {cancel: true});

                        resolve(result);
                    }
                });
        }
        catch (e) {
            reject(e);
        }
    });
};

exports.usersReservationsIdCancelPOST = function(id, userEmail) {
    return new Promise(function(resolve, reject) {
        let result;
        try {
            return sqlDb("reservation")
                .first()
                .where("user_email", userEmail)
                .where("event_id", id)
                .timeout(2000, {cancel: true})
                .then(reservation => {
                    if (reservation) {
                        result = sqlDb("reservation")
                            .where("user_email", userEmail)
                            .where("event_id", id)
                            .del()
                            .timeout(2000, {cancel: true});
                        resolve(result);
                    } else {
                        reject("Invalid reservation id");
                    }
                });
        }
        catch (e) {
            reject(e);
        }
    });
};
