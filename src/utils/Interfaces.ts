export interface ISteamUser extends Request {
  user: {
    _json: object
    id: string
    displayName: string
    name: string
    identifier: string
    photos: [{ value: String }]
  }
}
