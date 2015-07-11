
'use strict';

var express = require('express'),
    app = module.exports = express(),
    router = express.Router();
var apiController = require('./controllers/api-controller');

router.post('/post-data', apiController.postData);
router.get('/get-data', apiController.getData);

module.exports.init = function() {
    return router;
};
