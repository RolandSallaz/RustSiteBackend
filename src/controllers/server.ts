import { NextFunction, Request, Response } from 'express'
import { errorMessages } from '../utils/errorMessages'
import { successMessages } from '../utils/successMesages'
import ConflictError from '../errors/ConflictError'
import Server from '../models/server'

export function sendServer(req: Request, res: Response, next: NextFunction) {
  const { ip, port, password } = req.body

  Server.create({ ip, port, password })
    .then(() => {
      res.status(201).send({ message: 'Сервер добавлен' })
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(errorMessages.SERVER_CONFLICT))
      }
      return next(err)
    })
}

export function deleteServer(req: Request, res: Response, next: NextFunction) {
  const { ip, port } = req.body
  Server.findOneAndDelete({ ip, port })
    .then(() => {
      res.send({ message: successMessages.DELETED })
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
