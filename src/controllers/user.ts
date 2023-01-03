import { Request, Response } from 'express'
import User from '../models/user';

export function getCurrentUser(req:Request, res:Response,) {
    return User.findById(req.user)
      .then((user) => {
        res.send(user);
      })
  }