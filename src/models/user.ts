import { model, Schema } from 'mongoose'
import { Group } from '../enums/enums'

interface IUser {
  steamId: number
  name: string
  photos: string[]
  balance: number
  group: Group
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
    default: Group.USER,
    enum: Group,
  },
})

export default model<IUser>('user', userSchema)
