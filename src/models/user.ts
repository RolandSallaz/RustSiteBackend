import mongoose from 'mongoose'

interface IUser {
  steamid: number
  name: string
  avatar: string
  balance: number
  permission: 'user' | 'admin'
}
const userSchema = new mongoose.Schema<IUser>({
  steamid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
})
