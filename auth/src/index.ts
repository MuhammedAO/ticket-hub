import { app } from './app';
import mongoose from 'mongoose'

const start = async () => {
  console.log("Starting.....")
  if(!process.env.JWT_KEY) {
    throw new Error('jwt not defined')
  }
  if(!process.env.MONGO_URI) {
  throw new Error("cannot find uri connection string")
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

  app.listen(3000, () => console.log("listening on port 3000"))
}

start()
