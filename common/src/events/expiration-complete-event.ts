import { Subjects } from "./subjects"


//updated version not being reflected 
export interface ExpirationCompleteEvent {
  subject: Subjects.ExpirationComplete
  data: {
    orderId: string
  }
}
