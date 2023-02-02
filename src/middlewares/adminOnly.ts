import { NextFunction, Response } from 'express'
import { Group } from '../enums/enums'
import NoPermissionError from '../errors/NoPermissionError'
import { errorMessages } from '../utils/errorMessages'
import { customRequest } from './auth'

export default (req: customRequest, res: Response, next: NextFunction) => {
  req.group == Group.ADMIN ? next() : next(new NoPermissionError(errorMessages.NO_PERMISSION))
}
