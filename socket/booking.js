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
        
        // For canncel ride
        socket.on('cancelRide', data => {
            console.log(data, '------------cancel------------')
            io.emit('isCancel' + data.receiverId, data);
        });
        // For Start ride
        socket.on('startRide', data => {
            console.log(data, '------------start------------')
            io.emit('isStarted' + data.receiverId, data);
        });
        // For End ride
        socket.on('endRide', data => {
            console.log(data, '------------end------------')
            io.emit('isEnded' + data.receiverId, data);
        });
    });
}