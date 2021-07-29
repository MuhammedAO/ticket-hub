import { Subjects } from "./subjects"

export interface ExpirationCompleleEvent {
  subject: Subjects.ExpirationComplete
  data: {
    orderId: string
  }
}
