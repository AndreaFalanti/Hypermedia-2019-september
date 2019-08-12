'use strict';

var utils = require('../utils/writer.js');
var Performer = require('../service/PerformerService');

module.exports.artistCompanyIdGET = function artistCompanyIdGET (req, res, next) {
  var company_id = req.swagger.params['company_id'].value;
  Performer.artistCompanyIdGET(company_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.artistIdGET = function artistIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Performer.artistIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.artistsGET = function artistsGET (req, res, next) {
  var size = req.swagger.params['size'].value;
  var page = req.swagger.params['page'].value;
  Performer.artistsGET(size,page)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.companiesGET = function companiesGET (req, res, next) {
  var size = req.swagger.params['size'].value;
  var page = req.swagger.params['page'].value;
  Performer.companiesGET(size,page)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.companyIdGET = function companyIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Performer.companyIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
