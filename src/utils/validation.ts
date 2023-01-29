import { celebrate, Joi } from 'celebrate'
import { ipRegex } from './config'

export const validateServer = celebrate({
  body: Joi.object().keys({
    ip: Joi.string().regex(ipRegex).required(),
    port: Joi.number().required().less(65535),
    password: Joi.string().required(),
  }),
})

export const validateProduct = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    price: Joi.number().required(),
    rconCommand: Joi.string().required(),
  }),
})
