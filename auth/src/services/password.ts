import { scrypt, randomBytes } from "crypto"
import { promisify } from "util"

//using promisify to transform scrypt from CB to Promises
const scrytpAsnyc = promisify(scrypt)


export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex')

    const buffr = (await scrytpAsnyc(password, salt, 64)) as Buffer

    return `${buffr.toString('hex')}.${salt}`
  }

}
