import nats, { Message, Stan } from "node-nats-streaming"
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
    .setDurableName("a-service")

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

abstract class Listener {
  abstract subject: string
  abstract queueGroupName: string
  abstract onMessage(data: any, msg: Message): void
  private client: Stan
  protected ackWait = 5 * 1000

  constructor(client: Stan) {
    this.client = client
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDeliverAllAvailable()
      .setDurableName(this.queueGroupName)
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    )

    subscription.on("message", (msg: Message) => {
      console.log(`Message recieved: ${this.subject} / ${this.queueGroupName}`)

      const parsedData = this.parseMessage(msg)

      this.onMessage(parsedData, msg)
    })
  }

  parseMessage(msg: Message) {
    const data = msg.getData()

    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf-8"))
  }
}
