import express from "express"
import 'express-async-errors'
import cookieSession from 'cookie-session'

import { currentUserRouter } from "./routes/current-user"
import { signinRouter } from "./routes/signin"
import { signoutRouter } from "./routes/signout"
import { signupRouter } from "./routes/signup"
import { errorHandler } from "./middlewares/error-handler"
import { NotFoundError } from "./errors/not-found-error"
import mongoose from 'mongoose'

const app = express()
app.set('trust proxy', true)
app.use(express.json())

app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)

app.use(currentUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)

app.all("*", async (req: any, res: any) => {
  throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
  if(!process.env.JWT_KEY) {
    throw new Error('jwt not defined')
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })

    console.log('DB connected')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => console.log("listening on port 3000"))
}

start()
