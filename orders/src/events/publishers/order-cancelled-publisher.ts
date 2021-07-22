import { Subjects, Publisher, OrderCancelledEvent } from "@mhd-ticketx/ticket-x"

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}
