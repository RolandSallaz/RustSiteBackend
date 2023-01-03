import passport from 'passport'
import { login, logout } from '../controllers/auth'
import { NextFunction, Request, Response } from 'express'

const router = require('express').Router()

router.get(
  '/steam',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req: Request, res: Response) {
    res.redirect('/')
  },
)
router.get(
  '/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  login,
)
router.get('/logout', logout)

export default router
