import { NextFunction, Request, Response } from 'express'
import User from '../models/user'

export function getCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return User.findById(req.user).then(res.send).catch(next)
}
