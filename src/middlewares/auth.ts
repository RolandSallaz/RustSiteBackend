import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../utils/config'

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt

  let payload
  try {
    payload = jwt.verify(token, SECRET_KEY)
  } catch (err) {
    next(err)
  }
  req.user = payload
  next()
}
