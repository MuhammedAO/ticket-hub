import { Listener } from "./base-listener"
import nats, { Message } from "node-nats-streaming"
import { TicketCreatedEvent } from "./ticket-created-event"
import { Subjects } from "./subjects"

export class TickedCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated
  queueGroupName = "payments-service"
  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Data: ", data)

    msg.ack()
  }
}
