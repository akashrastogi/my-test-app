
'use strict';

var path = require('path'),
    bodyParser = require('body-parser'),
    compressor = require('compression'),
    apiRouter = require('../api-router'),
    viewRouter = require('../view-router'),
    helmet = require('helmet'),
    express = require('express'),
    winston = require('./winston');

module.exports.init = function(app, rootDir) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(compressor());
    app.use(helmet());
    var assetPath = path.join(rootDir, 'public');
    app.use(express.static(assetPath));
    app.use(winston.logger(rootDir));
    app.use('/api/v1', apiRouter.init());
    app.use('/', viewRouter.init());
};
