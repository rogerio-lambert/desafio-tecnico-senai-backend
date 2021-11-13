const devicesOnline = {};

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('newDevice', ({ data, controls }) => {
      const { id } = socket;
      devicesOnline[id] = { data, controls };
      io.emit('newDevice', { id, data, controls });
    });
    socket.on('newDashboard', () => {
      socket.emit('sendDataDevices', devicesOnline);
    });
    socket.on('updateDashboard', ({ id, data }) => {
      devicesOnline[id] = { data };
      io.emit('updateDashboard', { id, data, controls });
    });
    socket.on('controlDevice', ({ id, controls }) => {
      io.emit('controlDevice', { id, controls });
    });

  });  
}