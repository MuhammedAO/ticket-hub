import { Publisher, Subjects, TicketUpdatedEvent } from "@mhd-ticketx/ticket-x"

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}
