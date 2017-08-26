var tungus = require('tungus');
var mongoose = require('mongoose');
var http = require('http');

var StockSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    color: String
});

var StockModel = mongoose.model('Stock', StockSchema);

StockSchema.pre('save', function(next){
    var name = this.name;
    StockModel.find({name: name}, function(err){
        if(err)
            return next(err);
    });
    var url = 'http://d.yimg.com/autoc.finance.yahoo.com/autoc?query='+name+'&region=1&lang=en';
    
    http.get(url, function(res){
        var body = '';
    
        res.on('data', function(chunk){
            body += chunk;
        });
    
        res.on('end', function(){
            var res = JSON.parse(body)['ResultSet']['Result'];
            for(var c=0; c<res.length; c++){
                if(name===res[c]['symbol'])
                    return next();
            }
            var err = new Error('No match found');
            return next(err);
        });
    }).on('error', function(e){
          next(e);
    });
});

module.exports = StockModel;