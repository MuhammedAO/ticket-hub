import { Subjects, Publisher, ExpirationCompleteEvent } from "@mhd-ticketx/ticket-x"

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}
