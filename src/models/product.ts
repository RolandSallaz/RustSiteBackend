import { model, Schema, Types } from 'mongoose'
import { IProduct } from '../interfaces'

export interface IProductSchema extends IProduct{
  imageLink: string
}
const productSchema = new Schema<IProductSchema>({
  title: { type: String, required: true },
  price: { type: Types.Decimal128, required: true },
  imageLink: { type: String, required: true },
  rconCommand: { type: String, required: true },
})

export default model<IProductSchema>('product', productSchema)
