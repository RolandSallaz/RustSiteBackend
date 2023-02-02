import { NextFunction, Request, Response } from 'express'
import { errorMessages } from '../utils/errorMessages'
import { successMessages } from '../utils/successMesages'
import ConflictError from '../errors/ConflictError'
import Servers, { IServer } from '../models/server'
import { serverMessage } from '../utils/rconUtil'
import { customRequest } from '../middlewares/auth'
import { Group } from '../enums/enums'
const { Client } = require('rustrcon')

export function sendServer(req: Request, res: Response, next: NextFunction) {
  const { ip, port, password } = req.body

  Servers.create({ ip, port, password })
    .then((server) => {
      res.status(201).send({ message: 'Сервер добавлен', server })
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(errorMessages.SERVER_CONFLICT))
      }
      return next(err)
    })
}

export function deleteServer(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  Servers.findByIdAndDelete(id)
    .then((server) => {
      res.send({ message: successMessages.DELETED, server })
    })
    .catch(next)
}

export function getServers(
  req: customRequest,
  res: Response,
  next: NextFunction,
) {
  Servers.find({})
    .then((servers) => {
      res.send(
        req.group == Group.ADMIN
          ? servers
          : servers.map((item) => {
              return {
                ip: item.ip,
                port: item.port,
                info: {
                  Hostname: item.info.Hostname,
                  MaxPlayers: item.info.MaxPlayers,
                  Players: item.info.Players,
                  Map: item.info.Map,
                },
                enabled: item.enabled,
              }
            }),
      )
    })
    .catch(next)
}

export function sendServerCommand(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const {
    params: { id },
    body: { command },
    user,
  } = req
  Servers.findById(id).then((server) => {
    serverMessage({ server: server as IServer, command, user })
      .then((message) => res.send(message))
      .catch(next)
  })
}
