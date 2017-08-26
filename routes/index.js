module.exports = function (app, io) {

    var controller = require('../controller');

    app.get('/', controller.all);

    io.on('connection', function (socket) {
        socket.on('add stock', function (stack) {
            controller.add(stack, function (err, stack) {
                if(err){
                    io.emit('stop loading');
                    return io.emit('show err');
                }
                io.emit('add stock', stack);
                console.log(stack);
            });
        });

        socket.on('delete stock', function (name) {
            controller.delete(name);
            io.emit('delete stock', name);
            console.log('stack ' + name + ' deleted!')
        });
    });
};