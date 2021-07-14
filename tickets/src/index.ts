import { app } from './app';
import mongoose from 'mongoose'

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
