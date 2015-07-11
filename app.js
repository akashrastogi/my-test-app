
'use strict';
var express = require('express'),
    app = module.exports = express(),
    path = require('path'),
    winston = require('./app/middleware/winston'),
    middleware = require('./app/middleware');

// View setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'jade');
app.set('view options', {
    pretty: true
});

// Middlewares
middleware.init(app, __dirname);

// Error handling
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    // Don't want prod users to see the stacktrace
    var error = (app.get('env') === 'production') ? {} : err;
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: error
    });
});

app.use(winston.errorLogger(__dirname));

// Run the app
if (!module.parent) {
    app.listen(process.env.PORT || 3000, function(){
      console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
    console.log('Server started in %s mode on port %d', app.get('env'), port);
}
