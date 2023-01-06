import {celebrate,Joi} from 'celebrate';
import { ipRegex} from '../utils/config';

export const validateServer = celebrate({
    body: Joi.object().keys({
        ip: Joi.string().regex(ipRegex).required(),
        port: Joi.number().required().less(65535),
        password: Joi.string().required(),
    })
})