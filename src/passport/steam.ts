const passportSteam = require('passport-steam')
const SteamStrategy = passportSteam.Strategy
import { API_KEY, PORT } from '../utils/config'
import { ISteamUser } from '../utils/Interfaces'

export const steamPassport = new SteamStrategy(
  {
    returnURL: 'http://localhost:' + PORT + '/auth/steam/return',
    realm: 'http://localhost:' + PORT + '/',
    apiKey: API_KEY,
  },
  function (identifier: string, profile: ISteamUser, done: any) {
    process.nextTick(function () {
      return done(null, profile)
    })
  },
)
