'use strict';

var utils = require('../utils/writer.js');
var Seminar = require('../service/SeminarService');

module.exports.seminarsDateDateGET = function seminarsDateDateGET (req, res, next) {
  var date = req.swagger.params['date'].value;
  Seminar.seminarsDateDateGET(date)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.seminarsGET = function seminarsGET (req, res, next) {
  var size = req.swagger.params['size'].value;
  var page = req.swagger.params['page'].value;
  Seminar.seminarsGET(size,page)
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
      utils.writeJson(res, response);
    });
};

module.exports.seminarsLocationLocationGET = function seminarsLocationLocationGET (req, res, next) {
  var location = req.swagger.params['location'].value;
  Seminar.seminarsLocationLocationGET(location)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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