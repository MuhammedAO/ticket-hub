import { app } from './app';
import mongoose from 'mongoose'

const start = async () => {
  if(!process.env.JWT_KEY) {
    throw new Error('jwt not defined')
  }
  if(!process.env.MONGO_URI) {
    throw new Error('cannot find mongo uri connect string')
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })

    console.log('DB connected')
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => console.log("Ticket srv listening on port 3000"))
}

start()
