'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.eventsGET = function eventsGET (req, res, next) {
    var type = req.swagger.params['type'].value;
    var date = req.swagger.params['date'].value;
    var location = req.swagger.params['location'].value;
    Event.eventsGET(type,date,location)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.eventsIdGET = function eventsIdGET (req, res, next) {
    var id = req.swagger.params['id'].value;
    Event.eventsIdGET(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            res.statusCode = response.code;
            res.statusMessage = response.error;
            res.end();
            //utils.writeJson(res, response, response.code);
        });
};

module.exports.eventsIdArtistsGET = function eventsIdArtistsGET (req, res, next) {
    var id = req.swagger.params['id'].value;
    Event.eventsIdArtistsGET(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.eventsIdCompaniesGET = function eventsIdCompaniesGET (req, res, next) {
    var id = req.swagger.params['id'].value;
    Event.eventsIdCompaniesGET(id)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
