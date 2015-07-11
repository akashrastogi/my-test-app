
'use strict';

var winston = require('winston'),
    expressWinston = require('express-winston'),
    fs = require('fs'),
    path = require('path');

module.exports.logger = function(rootDir) {
    return expressWinston.logger({
        transports: [
            new winston.transports.Console({
                json: true,
                colorize: true
            }),
            new winston.transports.File({
                stream: fs.createWriteStream(path.join(rootDir, 'log', 'server.log'), {
                    flags: 'a+'
                })
            })
        ]
    });
};

module.exports.errorLogger = function(rootDir) {
    return expressWinston.errorLogger({
        transports: [
            new winston.transports.File({
                stream: fs.createWriteStream(path.join(rootDir, 'log', 'error.log'), {
                    flags: 'a+'
                })
            })
        ]
    });
};
