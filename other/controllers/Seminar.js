'use strict';

var utils = require('../utils/writer.js');
var Seminar = require('../service/SeminarService');

module.exports.seminarsGET = function seminarsGET (req, res, next) {
    var date = req.swagger.params['date'].value;
    var location = req.swagger.params['location'].value;
    Seminar.seminarsGET(date,location)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.seminarsIdGET = function seminarsIdGET (req, res, next) {
    var id = req.swagger.params['id'].value;
    Seminar.seminarsIdGET(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            res.statusCode = response.code;
            res.statusMessage = response.error;
            res.end();
        });
};

module.exports.seminarsIdEventsGET = function seminarsIdEventsGET (req, res, next) {
    var id = req.swagger.params['id'].value;
    Seminar.seminarsIdEventsGET(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};