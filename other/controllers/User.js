'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.usersRegisterPOST = function usersRegisterPOST (req, res, next) {
    var body = req.swagger.params['body'].value;
    User.usersRegisterPOST(body)
        .then(function (response) {
            res.statusCode = 204;
            res.statusMessage = "Successful registration";
            res.end();
        })
        .catch(function (response) {
            res.statusCode = 400;
            res.statusMessage = "Email already taken";
            res.end();
        });
};

module.exports.usersDataGET = function usersDataGET (req, res, next) {
    if (req.session.loggedin) {
        User.usersDataGET(req.session.email)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
    }
    else {
        res.statusCode = 401;
        res.statusMessage = "Not authenticated";
        res.end();
    }
};

module.exports.usersReservationsGET = function usersReservationsGET (req, res, next) {
    if (req.session.loggedin) {
        User.usersReservationsGET(req.session.email)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
    }
    else {
        res.statusCode = 401;
        res.statusMessage = "Not authenticated";
        res.end();
    }
};

module.exports.usersLoginPOST = function usersLoginPOST (req, res, next) {
    var login = req.swagger.params['login'].value;
    User.usersLoginPOST(login)
        .then(function (response) {
            if(!req.session.loggedin) {
                req.session.loggedin = true;
                req.session.email = login.email;
            }

            res.statusCode = 204;
            res.statusMessage = "Successful login";
            res.end();
        })
        .catch(function (response) {
            res.statusCode = 400;
            res.statusMessage = "Invalid login";
            res.end();
        });
};

module.exports.usersLogoutPOST = function usersLoginPOST (req, res, next) {
    if(req.session.loggedin) {
        req.session.loggedin = false;
        req.session = null;

        res.statusCode = 204;
        res.statusMessage = "Successful logout";
        res.end();
    }
    else {
        res.statusCode = 400;
        res.statusMessage = "Trying logout when not logged in";
        res.end();
    }
};

module.exports.usersReservePOST = function usersReservePOST (req, res, next) {
    var body = req.swagger.params['body'].value;
    if (req.session.loggedin) {
        User.usersReservePOST(body, req.session.email)
            .then(function (response) {
                res.statusCode = 204;
                res.statusMessage = "Successful reservation";
                res.end();
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
    }
    else {
        res.statusCode = 401;
        res.statusMessage = "Not authenticated";
        res.end();
    }
};

module.exports.usersReservationsIdCancelPOST = function usersReservationsIdCancelPOST (req, res, next) {
    var id = req.swagger.params['id'].value;
    if (req.session.loggedin) {
        User.usersReservationsIdCancelPOST(id, req.session.email)
            .then(function (response) {
                res.statusCode = 204;
                res.statusMessage = "Reservation canceled";
                res.end();
            })
            .catch(function (response) {
                res.statusCode = 400;
                res.statusMessage = "No reservation with that event id found";
                res.end();
            });
    }
    else {
        res.statusCode = 401;
        res.statusMessage = "Not authenticated";
        res.end();
    }
};
