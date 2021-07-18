import nats, { Message } from "node-nats-streaming"
import { randomBytes } from "crypto"

console.clear()

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
})

stan.on("connect", () => {
  console.log("Subscriber connected to NATS")

  const options = stan.subscriptionOptions().setManualAckMode(true)

  // Subscribes to a given subject as an optional member of a queue group.
  const subscription = stan.subscribe(
    "ticked:created",
    "orders-service-queue-group",
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
