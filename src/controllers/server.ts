import { NextFunction, Request, Response } from 'express'
import { errorMessages } from '../utils/errorMessages'
import { successMessages } from '../utils/successMesages'
import ConflictError from '../errors/ConflictError'
import Server, { IServer } from '../models/server'
import { serverMessage } from '../utils/rconUtil'
const { Client } = require('rustrcon')

export function sendServer(req: Request, res: Response, next: NextFunction) {
  const { ip, port, password } = req.body

  Server.create({ ip, port, password })
    .then((server) => {
      res.status(201).send({ message: 'Сервер добавлен', server})
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(errorMessages.SERVER_CONFLICT))
      }
      return next(err)
    })
}

export function deleteServer(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  Server.findByIdAndDelete(id)
    .then((server) => {
      res.send({ message: successMessages.DELETED, server })
    })
    .catch(next)
}

export function getServers(req: Request, res: Response, next: NextFunction) {
  Server.find({})
    .then((servers) => {
      res.send(servers)
    })
    .catch(next)
}

export function sendServerCommand(req: Request, res: Response, next: NextFunction){
  const { params:{id},body:{command},user} = req;
  Server.findById(id)
    .then((server)=>{
      serverMessage({server: server as IServer,command,user})
      .then((message)=>res.send(message))
      .catch(next)
    })
}
