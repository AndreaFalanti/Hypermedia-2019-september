'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.eventsGET = function eventsGET (req, res, next) {
    var size = req.swagger.params['size'].value;
    var page = req.swagger.params['page'].value;
    var type = req.swagger.params['type'].value;
    var date = req.swagger.params['date'].value;
    var location = req.swagger.params['location'].value;
    Event.eventsGET(size,page,type,date,location)
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
