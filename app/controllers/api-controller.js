
'use strict';

var jsonfile = require('jsonfile');
var util = require('util');
var fileName = 'database.json';

module.exports.postData = function(req, res) {
    console.log('Receive a post call on /post-data. \n Received data- ' + JSON.stringify(req.body, 0, 4));
    var doc = req.body;
    var array = [];
    var receivedData = {
        body: req.body,
        timestamp: new Date()
    };
    jsonfile.readFile(fileName, function(err, obj) {
        if (err && err.errno == 34) { // file doesn't exist
            console.log('json file does not exist');
            array.push(receivedData);
        } else { // file exists
            array = obj;
            // insert at 0 indes(top)
            array.splice(0, 0, receivedData);
        }

        // write file
        jsonfile.writeFile(fileName, array, {
            spaces: 2
        }, function(err) {
            if (err) {
                console.log('Could not write json file to dish. \n Error- ' + err);
            };
        });
    });
    res.status(200).end('Data received successfully.');
};

module.exports.getData = function(req, res) {
    console.log('Receive a get call on /get-data.');

    jsonfile.readFile(fileName, function(err, obj) {
        if (err) {
            res.status(500).end('Some thing went wrong.');
        }
        else res.status(200).end(JSON.stringify(obj, 0, 4));
    });
}