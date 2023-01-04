import { transports, format } from 'winston'
const { combine, prettyPrint, timestamp, json, simple } = format
import expressWinston from 'express-winston'

const formatLogs = () =>
  combine(json(), timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), prettyPrint())

export const requestLogger = expressWinston.logger({
  transports: [new transports.File({ filename: 'logs/request.log' })],
  format: formatLogs(),
})

export const errorLogger = expressWinston.errorLogger({
  transports: [new transports.File({ filename: 'logs/error.log' })],
  format: formatLogs(),
})
