module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('socket is running');
        socket.on('send-data-to-drivers', data => {

            data.driversIds.forEach(element => {
                io.emit('receive-data-of-driver' + element.driverId, data.objFromRequest);
            });
            console.log('socket is listening to send-data-to-drivers');
        });
        socket.on('send-driver-to-passenger', data => {
            console.log(data)
            io.emit('receive-driver' + data.passengerId, data);
        });
    });
}