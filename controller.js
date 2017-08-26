var tungus = require('tungus');
var mongoose = require('mongoose');
var stock = require('./models/stock');

mongoose.connect('tingodb://' + __dirname + '/db');

exports.all = function (req, res) {
    stock.find({}, function (err, stocks) {
        if (!err) {
            stock.find({}, function (err, stocks) {
                if (!err) {
                    return res.render('index.html', {stocks: stocks});
                }
            });
        }
    });
}

exports.add = function (stack, callback) {
    var s = new stock({
        name: stack[0],
        color: stack[1]
    });

    s.save(function (err, stack) {
        if (err)
            return callback(err, stack);
        callback(err, stack);
    });
}

exports.delete = function (name) {
    stock.find({
        name: name
    }).remove(function (err) {
        if (err)
            res.send(err);
    });
};