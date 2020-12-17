module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('socket is running');
        socket.on('send-data-to-drivers', data => {

            data.driverIds.forEach(element => {
                io.emit('receive-data-of-driver' + element.driverId, element);
            });
            console.log('socket is listening to send-data-to-drivers');
            console.log(data);
        }); 

        socket.on('send-driver-to-passenger', data => {

            data.driverIds.forEach(element => {
                io.emit('receive-data-of-driver' + element.driverId, element);
            });
            console.log('socket is listening to send-driver-to-passenger');
            console.log(data);
        }); 
    });
}