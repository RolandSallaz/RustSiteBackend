import { Types,} from 'mongoose';

export interface IProduct {
  title: String
  price: Types.Decimal128
  rconCommand: String
}
