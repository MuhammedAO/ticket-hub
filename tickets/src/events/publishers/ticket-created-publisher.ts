import { Publisher, Subjects, TicketCreatedEvent } from "@mhd-ticketx/ticket-x"

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated
}
