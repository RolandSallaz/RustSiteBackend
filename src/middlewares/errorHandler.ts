import { errorMessages } from '../utils/errorMessages'
import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err
  res.status(statusCode).send({
    message: statusCode === 500 ? message : message, // errorMessages.SERVER :
  })
  next()
}

export default errorHandler
