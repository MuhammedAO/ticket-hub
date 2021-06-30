export class DatabaseConnectionError extends Error {
  statusCode = 500
  reason = 'Error connecting to DB'
  constructor(){
    super()

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)

  }
 
  serializeErrors(){
    return [
      {message: this.reason}
    ]
  }
}