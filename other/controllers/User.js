'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.userRegisterPOST = function userRegisterPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.userRegisterPOST(body)
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
      utils.writeJson(res, response);
    });
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
      console.log("It's actually resolved");
      if(!req.session.loggedin) {
        req.session.loggedin = true;
      }
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 400);
    });
};

module.exports.usersLogoutPOST = function usersLoginPOST (req, res, next) {
  User.usersLogoutPOST()
      .then(function (response) {
        if(req.session.loggedin) {
          req.session.loggedin = false;
        }
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};
