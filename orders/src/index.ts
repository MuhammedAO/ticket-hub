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
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined")
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined")
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined")
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    )
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
