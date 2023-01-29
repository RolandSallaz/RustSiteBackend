import { ErrorEvent } from 'ws'
import Server, { IServer, IServerInfo } from '../models/server'
import { errorMessages } from './errorMessages'
const { Client } = require('rustrcon')

export function checkAndUpdateServers() {
  Server.find({}).then((servers:IServer[]) => {
    if (!servers.length) return
    servers.forEach((server) => updateServerInfo(server))
  })
}

async function updateServerInfo(server: IServer) {
  const rcon = new Client({
    ip: server.ip,
    port: server.port,
    password: server.password,
  })
  rcon.login()
  rcon.on('connected', () => {
    rcon.send('serverinfo', 'Artful', 10)
  })
  await new Promise((resolve, reject) => {
    rcon.on('message', (message: { content: IServerInfo }) => {
      if (message.content.hasOwnProperty('Hostname')) {
        Server.findOneAndUpdate(
          { ip: server.ip, port: server.port },
          { info: message.content, enabled: true },
        )
          .then(resolve)
          .catch(reject)
      }
    })
    rcon.on('error', (err: ErrorEvent) => {

      reject(err)
    })
  })
    .catch((err: ErrorEvent) => {
      const {
        error: { errno, adress },
      } = err
      if (errno == -4078) {
        // Server.findOneAndUpdate({ ip: adress }, { enabled: false });
        console.log(`${errorMessages.SERVER_COULD_NOT_CONNECT} ${server.ip} ${server.port}`)
      }
      Server.findOneAndUpdate({ ip:server.ip,port:server.port }, { enabled: false });
    })
    .finally(() => rcon.destroy())
}

export async function serverMessage<T>({
  server,
  command,
  user,
}: {
  server: IServer
  command: string,
  user:T,
}) {
  const rcon = new Client({
    ip: server?.ip,
    port: server?.port,
    password: server?.password,
  })
  rcon.login()
  return new Promise((resolve, reject) => {
    rcon.on('connected', () => {
      sendCommand(command).then(resolve)
    })
    rcon.on('error', reject)
  }).then(()=>rcon.destroy()) // finally

  function sendCommand(command: string) {
    return new Promise((resolve, reject) => {
      rcon.send(command, user, 10)
      rcon.on('message', (message: any) => {
        resolve(message)
      })
    })
  }
}
