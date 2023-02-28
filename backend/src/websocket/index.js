module.exports = (strapi) => {
  const io = require('socket.io')(strapi.server.httpServer, {cors: {origin: '*'}});
  io.on('connection', async (socket) => {
    console.log(`New user connected, sending hello!`)
    // send to client
    socket.emit('hello', {status: 'connected'});
    socket.on('join', async (credentials) => {
      // const ioRoom = "room_" + credentials.room
      // socket.join(ioRoom)
      //
      try {
      //   let {players} = await strapi.service('api::game.game').findOne(credentials.room)
      //   if (players.length > 0) {
      //     //if exists try to merge player
      //     if (players.filter((player) => player.id === credentials.player.id).length === 0) {
      //       players.push(credentials.player)
      //     }
      //   } else {
      //     players.push(credentials.player)
      //   }
      //   await strapi.service('api::game.game').update(credentials.room, {data: {players}})
      } catch (e) {
        console.log(e)
      } finally {
        // io.to(ioRoom).emit('room', await strapi.service('api::game.game').findOne(credentials.room, {'populate': '*'}));
      }
    })

    // socket.on('player_ready', async (credentials) => {
      // const ioRoom = "room_" + credentials.room
      // socket.join(ioRoom)

      // let {players} = await strapi.service('api::game.game').findOne(credentials.room)
      // players.map((player)=>{
      //   if(player.id===credentials.player){
      //     player.status = 'ready'
      //   }
      //   return player
      // })
      // await strapi.service('api::game.game').update(credentials.room, {data: {players}})
      // io.to(ioRoom).emit('room', await strapi.service('api::game.game').findOne(credentials.room, {'populate': '*'}));
    // })
    // listen for user disconnect
    socket.on('disconnect', () => {
      console.log('a user disconnected')
    });
  });
// register socket io inside strapi main object to use it globally anywhere
  strapi.io = io;
}
