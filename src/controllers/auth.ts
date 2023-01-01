import { steam } from '../utils/config'
import { Request, Response } from "express";

export async function redirectToAuthLink(req: Request, res: Response) {
  const redirectUrl = await steam.getRedirectUrl()
  return res.redirect(redirectUrl)
}

export async function steamAuth(req: Request, res: Response) {
  try {
    const user = await steam.authenticate(req)
    const { personaname, steamid, avatarMedium } = user._json
    return res.send(user._json)
    //...do something with the data
  } catch (error) {
    console.error(error)
  }
}

