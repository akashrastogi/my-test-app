
'use strict';

var express = require('express'),
    router = express.Router();
var viewController = require('./controllers/view-controller');

router.get('/', viewController.index);

module.exports.init = function() {
    return router;
};
