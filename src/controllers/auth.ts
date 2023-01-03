import { Request, Response } from 'express'
import User from '../models/user'
import { ISteamUser } from '../utils/Interfaces'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../utils/config'

export function login(req: ISteamUser & Request, res: Response) {
  const { id, displayName, photos } = req.user
  User.findOneAndUpdate(
    { steamId: id },
    { steamId: id, name: displayName, photos },
    { new: true, upsert: true },
  )
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' })
      return res
        .cookie('jwt', token, {
          maxAge: 7 * 24 * 3600 * 1000, // one week
          httpOnly: true,
          sameSite: 'none', // true
          secure: true,
        })
        .redirect('/')
    })
    .catch(console.log)
}

export function logout(req: Request, res: Response) {
  return res.clearCookie('jwt').status(200).send({ message: 'Выход успешен' })
}
