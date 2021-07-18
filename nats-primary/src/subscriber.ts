import nats, { Message } from "node-nats-streaming"
import { randomBytes } from "crypto"

console.clear()

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
})

stan.on("connect", () => {
  console.log("Subscriber connected to NATS")

  stan.on("close", () => {
    console.log("Connection close")
    process.exit()
  })

  const options = stan
  .subscriptionOptions()
  // Configures the subscription to require manual acknowledgement of messages using Message#acknowledge.
  .setManualAckMode(true)
  // Configures the subscription to replay from first available message.
  .setDeliverAllAvailable()
  // Sets a durable subscription name that the client can specify for the subscription. This enables the subscriber to close the connection without canceling the subscription and resume the subscription with same durable name. Note the server will resume the subscription with messages that have not been acknowledged.
  .setDurableName('a-service')

  // Subscribes to a given subject as an optional member of a queue group.
  // the qGrp makes sure that we do not accidentally dump the durable name even if all of our  services restarts and to make sure that emmitted events only go off to 1 instance of the services
  const subscription = stan.subscribe(
    "ticked:created",
    // "orders-service-queue-group",
    options
  )

  subscription.on("message", (msg: Message) => {
    console.log("Message recieved")

    // getData teturns the data associated with the message payload. If the stanEncoding is not set to 'binary', a string is returned.
    const data = msg.getData()

    if (typeof data === "string") {
      console.log(`Recieved event #${msg.getSequence()}, with data: ${data}`)
    }

    msg.ack()
  })
})

process.on("SIGINT", () => stan.close())
process.on("SIGTERM", () => stan.close())
