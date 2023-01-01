const { Client } = require('rustrcon')
const rcon = new Client({
  ip: '185.244.6.37',
  port: '28016',
  password: '199812',
})

rcon.login()


rcon.on('connected', () => {
  console.log(`Connected to ${rcon.ws.ip}:${rcon.ws.port}`)

  // Message, Name, Identifier.
  //rcon.send('serverinfo', 'Artful', 10);
  // setTimeout(() => {
  // rcon.destroy();
  // }, 5000);
})
rcon.on('message', (message: any) => {
  console.log(message)
})