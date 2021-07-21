export enum OrderStatus {
  //when a order has been created, and the ticket associated with this order has not been reserved
  Created = "created",
  //when a ticket an order is trying to reserve has been reserved, when a user cancels the order, and also order expiring before payment
  Cancelled = "cancelled",
  //order successfully reserved
  AwaitingPayment = "awaiting:payment",
  //payment provided and order completed
  Complete = "complete",
}
