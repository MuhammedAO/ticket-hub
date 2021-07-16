import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"


declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[]
    }
  }
}

let mongo: any

beforeAll(async () => {
  process.env.JWT_KEY = "jhknj"
  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signin = () => {
  //fake authentication
  //build jwt payload
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "llkmfk@kmdkl.com",
  }

  //create jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!)

  //build session{}
  const session = {
    jwt: token,
  }
  //convert to json
  const sessJSON = JSON.stringify(session)

  //encode
  const base64 = Buffer.from(sessJSON).toString("base64")

  return [`express:sess${base64}`]
}
