import { app } from "./app"
import mongoose from "mongoose"
import { natsWrapper } from "./nats-wrapper"

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("jwt not defined")
  }
  if (!process.env.MONGO_URI) {
    throw new Error("cannot find mongo uri connect string")
  }

  try {
    await natsWrapper.connect("ticketing", "jnj", "http://nats-srv:4222")
    natsWrapper.client.on("close", () => {
      console.log("Connection close")
      process.exit()
    })

    process.on("SIGINT", () => natsWrapper.client.close())
    process.on("SIGTERM", () => natsWrapper.client.close())
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })

    console.log("DB connected")
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => console.log("Ticket srv listening on port 3000"))
}

start()
