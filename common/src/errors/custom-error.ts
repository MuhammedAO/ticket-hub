// abstract classes cannot be instantiated and are used to setup requirements for subclasses
//when translated to javascript, this becomes an actual class
export abstract class CustomError extends Error {
  abstract statusCode: number

  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors(): {
    message: string
    field?: string
  }[]
}
