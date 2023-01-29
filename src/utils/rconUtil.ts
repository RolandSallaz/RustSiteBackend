import ws, { ErrorEvent, WebSocket } from 'ws'
import Servers, { IServer, IServerInfo } from '../models/server'
import { errorMessages } from './errorMessages'
const { Client } = require('rustrcon')
interface IClient extends WebSocket {
  options: {
    ip: string
    port: number
    password: string
  }
  login(): void
  destroy(): void
}
export function checkAndUpdateServers() {
  Servers.find({}).then((servers: IServer[]) => {
    if (!servers.length) return
    servers.forEach((server) => updateServerInfo(server))
  })
}

async function updateServerInfo(server: IServer) {
  const { ip, port, password } = server
  const rcon: IClient = new Client({
    ip,
    port,
    password,
  })
  rcon.login()
  rcon.on('connected', () => {
    rcon.send('serverinfo')
  })

  Promise.all([getServerInfo(rcon), getServerConnection(rcon)])
    .then(([info, enabled]) => {
      Servers.findOneAndUpdate({ ip, port }, { info, enabled})
    })
    .catch((err: ErrorEvent) => {
      if (err.error.errno == -4078) {
        Servers.findOneAndUpdate({ ip, port }, { enabled: false }).then(() =>
          console.log(
            `${errorMessages.SERVER_COULD_NOT_CONNECT} ${ip} ${port}`,
          ),
        )
      }
    })
    .finally(() => rcon.destroy())
}

async function getServerInfo(rcon: IClient) {
  return await new Promise((resolve, reject) => {
    rcon.on('message', (message: { content: IServerInfo }) => {
      message.content.hasOwnProperty('Hostname')
        ? resolve({ info: message.content })
        : reject()
    })
    rcon.on('error', reject)
  })
}

async function getServerConnection(rcon: IClient) {
  return await new Promise((resolve, reject) => {
    rcon.on('connected', () => {
      resolve(true)
    })
    rcon.on('error', reject)
  })
}

export async function serverMessage<T>({
  server,
  command,
  user,
}: {
  server: IServer
  command: string
  user: T
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
  }).then(() => rcon.destroy()) // finally

  function sendCommand(command: string) {
    return new Promise((resolve, reject) => {
      rcon.send(command, user, 10)
      rcon.on('message', (message: any) => {
        resolve(message)
      })
    })
  }
}
