import { model, Schema } from 'mongoose'

export interface IServerInfo {
  Hostname: String
  MaxPlayers: Number
  Players: Number
  Queued: Number
  Joining: Number
  EntityCount: Number
  GameTime: String
  Uptime: Number
  Map: String
  Framerate: Number
  Memory: Number
  Collections: Number
  NetworkIn: Number
  NetworkOut: Number
  Restarting: Boolean
  SaveCreatedTime: String
  Version: Number
  Protocol: String
}

export interface IServer {
  ip: String
  port: Number
  password: String
  enabled: Boolean
  info: IServerInfo
}
const serverSchema = new Schema<IServer>({
  ip: { type: String, required: true },
  port: { type: Number, required: true },
  password: { type: String, required: true },
  enabled: { type: Boolean, default: false },
  info: {
    Hostname: { type: String },
    MaxPlayers: { type: Number },
    Players: { type: Number },
    Queued: { type: Number },
    Joining: { type: Number },
    EntityCount: { type: Number },
    GameTime: { type: String },
    Uptime: { type: Number },
    Map: { type: String },
    Framerate: { type: Number },
    Memory: { type: Number },
    Collections: { type: Number },
    NetworkIn: { type: Number },
    NetworkOut: { type: Number },
    Restarting: { type: Boolean },
    SaveCreatedTime: { type: String },
    Version: { type: Number },
    Protocol: { type: String },
  },
})

export default model('server', serverSchema)
