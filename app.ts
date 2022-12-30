const express = require('express')
const bodyParser = require('body-parser')
const { Client } = require('rustrcon')

const app = express()
const { PORT ,API_KEY,PROTOCOL,SITE_DOMAIN } = require('./utils/config');
const SteamAuth = require('node-steam-openid')
const steam = new SteamAuth({
  realm: `${PROTOCOL}://localhost:${PORT}`, // Site name displayed to users on logon
  returnUrl: `${PROTOCOL}://${SITE_DOMAIN}:${PORT}/auth/steam/authenticate`, // Your return route
  apiKey: API_KEY, // Steam API key
})

app.use(bodyParser.urlencoded({ extended: true }))
const rcon = new Client({
  ip: '185.244.6.37',
  port: '28016',
  password: '199812',
})

rcon.login()

app.get('/auth/steam', async (req: any, res: any) => {
  const redirectUrl = await steam.getRedirectUrl()
  return res.redirect(redirectUrl)
})

app.get('/auth/steam/authenticate', async (req: any, res: any) => {
  try {
    const user = await steam.authenticate(req)
    console.log(res)
    //...do something with the data
  } catch (error) {
    console.error(error)
  }
})

app.get('/players', (req: any, res: any) => {
  console.log('send help')
})

rcon.on('connected', () => {
  console.log(`Connected to ${rcon.ws.ip}:${rcon.ws.port}`)

  // Message, Name, Identifier.
  //rcon.send('serverinfo', 'Artful', 10);
  // setTimeout(() => {
  // rcon.destroy();
  // }, 5000);
})
rcon.on('message', (message: any) => {
  console.log(message)
})
app.listen(PORT, () => {
  // eslint-disable-next-line no-console

  console.log(`App listening ons port ${PORT}`)
})
