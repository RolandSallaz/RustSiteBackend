import { NextFunction, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import Product, { IProductSchema } from '../models/product'
import { IProduct } from '../interfaces'
import { errorMessages } from '../utils/errorMessages'

var fs = require('fs')
interface IProductRequest extends IProduct {
  image: File
}

export function postProduct(req: Request, res: Response, next: NextFunction) {
  if (!req.files)
    return res
      .status(400)
      .send({ message: errorMessages.IMAGE_VALIDATION_ERROR })
  const { title, price, rconCommand } = <IProductRequest>req.body
  const image = req.files?.image as UploadedFile
  console.log(__dirname)
  const imageLink = `images/${title}${Date.now()}.${image.mimetype.replace(
    'image/',
    '',
  )}`
  fs.writeFile(imageLink, image.data, (err: Error) => {
    if (err) {
      return next(err)
    } else {
      Product.findOneAndUpdate<IProductSchema>(
        { title },
        { title, price, rconCommand, imageLink },
        { new: true, upsert: true },
      )
        .then((product) => {
          res.status(201).send(product)
        })
        .catch(next)
    }
  })
}
