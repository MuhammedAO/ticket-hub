import { Subjects, Publisher, PaymentCreatedEvent } from "@mhd-ticketx/ticket-x"

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}
