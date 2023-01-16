import { NextFunction, Request, Response } from 'express'
import NoPermissionError from '../errors/NoPermissionError'
import User from '../models/user'
import { errorMessages } from '../utils/errorMessages'

export default (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.user).then((user) => {
    user?.group == 'admin' ? next() : next(new NoPermissionError(errorMessages.NO_PERMISSION))
  })
  .catch(next)
}
