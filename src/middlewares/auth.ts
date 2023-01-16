import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../utils/config'

interface userCookie {
  exp: number
  iat: number
  _id: 'string'
}

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt

  let userId;
  try {
    const payload = jwt.verify(token, SECRET_KEY) as userCookie
    userId= payload._id
  } catch (err) {
    next(err)
  }
  req.user = userId;
  
  next()
}
