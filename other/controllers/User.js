'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.usersRegisterPOST = function usersRegisterPOST (req, res, next) {
    var body = req.swagger.params['body'].value;
    User.usersRegisterPOST(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.usersEmailGET = function usersEmailGET (req, res, next) {
    var email = req.swagger.params['email'].value;
    User.usersEmailGET(email)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            res.statusCode = response.code;
            res.statusMessage = response.error;
            res.end();
        });
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

module.exports.usersGET = function usersGET (req, res, next) {
    var size = req.swagger.params['size'].value;
    User.usersGET(size)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.usersLoginPOST = function usersLoginPOST (req, res, next) {
    var login = req.swagger.params['login'].value;
    User.usersLoginPOST(login)
        .then(function (response) {
            if(!req.session.loggedin) {
                req.session.loggedin = true;
                req.session.email = login.email;
            }
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response, 400);
        });
};

module.exports.usersLogoutPOST = function usersLoginPOST (req, res, next) {
    if(req.session.loggedin) {
        req.session.loggedin = false;
        req.session = null;

        res.statusCode = 204;
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
