import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import NoPermissionError from '../errors/NoPermissionError'
import User from '../models/user'
import { SECRET_KEY } from '../utils/config'
import { errorMessages } from '../utils/errorMessages'

interface userCookie {
  exp: number
  iat: number
  _id: 'string'
}

export default (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user as userCookie
  User.findById({ _id }).then((user) => {
    if (user?.group == 'admin') {
      next()
    } else {
      return next(new NoPermissionError(errorMessages.NO_PERMISSION))  //задебажить
    }
  })
}
