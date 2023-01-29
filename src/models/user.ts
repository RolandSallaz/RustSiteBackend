import { model, Schema } from 'mongoose'

interface IUser {
  steamId: number
  name: string
  photos: string[]
  balance: number
  group: string
}
const userSchema = new Schema<IUser>({
  steamId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  photos: {
    type: [{ value: String }],
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  group: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
})

export default model<IUser>('user', userSchema)
