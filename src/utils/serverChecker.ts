import Server, { IServer, IServerInfo } from '../models/server'
const { Client } = require('rustrcon')

export function checkAndUpdateServers() {
  Server.find({}).then((servers) => {
    if (!servers.length) return
    servers.forEach((server) => updateServerInfo(server))
  })
}

function updateServerInfo(server: IServer) {
  const rcon = new Client({
    ip: server.ip,
    port: server.port,
    password: server.password,
  })
  rcon.login()
  rcon.on('connected', () => {
    rcon.send('serverinfo', 'Artful', 10)
  })
  rcon.on('message', (message: { content: IServerInfo }) => {
    if (message.content.hasOwnProperty('Hostname')) {
      Server.findOneAndUpdate(
        { ip: server.ip },
        { info: message.content, enabled: true },
      ).catch(console.log)
      rcon.destroy()
    }
  })
  rcon.on('error', (err: ErrorEvent) => {
    const {
      error: { errno, adress },
    } = err
    if (err.error.errno == -4078) {
      Server.findOneAndUpdate(
        { ip: err.error.address },
        { enabled: false },
      ).catch(console.log)
    }
  })
}
