const onlineDevices = {};

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('getId', () => {
      const { id } = socket;
      socket.emit('createId', { id });
    })
    socket.on('newDevice', ({id, params, controls, offMode }) => {
      onlineDevices[id] = { params, controls, offMode };
      io.emit('loadDevices', { devices: onlineDevices });
    });
    socket.on('newDashboard', () => {
      socket.emit('loadDevices', { devices: onlineDevices });
    });
    socket.on('updateDashboard', ({ id, params, controls }) => {
      onlineDevices[id].params = params;
      onlineDevices[id].controls = controls;
      io.emit('updateDashboard', { id, params, controls });
    });
    socket.on('controlDevice', ({ id, newControls }) => {
      io.emit('controlDevice', { id, newControls });
    });
    socket.on('switchOnOff', ({id, offMode }) => {
      onlineDevices[id].offMode = offMode;
      io.emit('switchOnOff', { id, offMode });
    });
    socket.on('disconnect', () => {
      if (onlineDevices.hasOwnProperty(socket.id)) {
        delete onlineDevices[socket.id];
        io.emit('loadDevices', { devices: onlineDevices });
      }
    });
  });  
}