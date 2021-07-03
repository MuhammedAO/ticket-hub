import { CustomError } from "./custom-error"

export class NotAuthorizedError extends CustomError {
  statusCode = 401
  constructor(public msg: string) {
    super(msg)
    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }

  serializeErrors() {
    return [{ message: this.msg }]
  }
}
