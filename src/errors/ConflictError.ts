export default class ConflictError extends Error {
  public statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = 409
  }
}
