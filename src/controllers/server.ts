import { Request, Response } from 'express'
import { errorMessages } from '../utils/errorMessages'
import { successMessages } from '../utils/successMesages'
const { Client } = require('rustrcon')

export function sendServer(req:Request,res:Response){
        const rcon = new Client(req.body)
        rcon.login()
        rcon.on('connected', () => {
            res
            .status(201)
            .send({message:successMessages.SERVER_CONNECTED})
          })
        rcon.on('error', (err:Error) => {
            res
            .status(408)
            .send({message:errorMessages.TIMEOUT})
         });
    }
