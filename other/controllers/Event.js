'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.eventsDateDateGET = function eventsDateDateGET (req, res, next) {
  var date = req.swagger.params['date'].value;
  Event.eventsDateDateGET(date)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsGET = function eventsGET (req, res, next) {
  var size = req.swagger.params['size'].value;
  var page = req.swagger.params['page'].value;
  Event.eventsGET(size,page)
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
      utils.writeJson(res, response);
    });
};

module.exports.eventsLocationLocationGET = function eventsLocationLocationGET (req, res, next) {
  var location = req.swagger.params['location'].value;
  Event.eventsLocationLocationGET(location)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsTypePerformanceTypeGET = function eventsTypePerformanceTypeGET (req, res, next) {
  var performance_type = req.swagger.params['performance_type'].value;
  Event.eventsTypePerformanceTypeGET(performance_type)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
