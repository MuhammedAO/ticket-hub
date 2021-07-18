import { Listener } from "./base-listener"
import nats, { Message } from "node-nats-streaming"

export class TickedCreatedListener extends Listener {
  subject = "ticked:created"
  queueGroupName = "payments-service"
  onMessage(data: any, msg: Message) {
    console.log("Data: ", data)

    msg.ack()
  }
}
