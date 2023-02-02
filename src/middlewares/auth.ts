import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Group } from '../enums/enums'
import { SECRET_KEY } from '../utils/config'

interface userCookie {
  exp: number
  iat: number
  _id: 'string'
  group: any
}

export interface customRequest extends Request {
  group?: Group
}

export default (req: customRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt

  let data;
  try {
    const payload = jwt.verify(token, SECRET_KEY) as userCookie
    data= {_id:payload._id,group:payload.group}
  } catch (err) {
    next(err)
  }
  req.user = data?._id;
  req.group = data?.group
  
  next()
}
