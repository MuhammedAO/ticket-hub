import { Publisher, OrderCreatedEvent, Subjects } from "@mhd-ticketx/ticket-x"

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated
}
