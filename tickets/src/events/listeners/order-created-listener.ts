import { Listener, OrderCreatedEvent, Subjects } from "@mhd-ticketx/ticket-x"
import { queueGroupName } from "./queue-group-name"
import { Message } from "node-nats-streaming"
import { Ticket } from "../../models/ticket"

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated
  queueGroupName = queueGroupName

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    //find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id)

    //if !ticket, throw err
    if (!ticket) {
      throw new Error("Ticket not found")
    }
    //mark ticket as being reserved by setting its order prop
    ticket.set({ orderId: data.id })

    //save the ticket
    await ticket.save()

    //ack the message
    msg.ack()
  }
}
