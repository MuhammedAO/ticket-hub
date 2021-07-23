import mongoose from "mongoose"
import { Order, OrderStatus } from "./order"

interface TicketAttrs {
  id: string
  title: string
  price: number
}

export interface TicketDoc extends mongoose.Document {
  title: string
  price: number
  isReserved(): Promise<boolean>
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
  })
}

ticketSchema.methods.isReserved = async function () {
  //run a query on all orders to find an order where the ticket === ticket(above) and make sure that the order status is not cancelled

  //if an order is found, that means the ticket is already reserved

  const existingOrder = await Order.findOne({
    ticket: this.id,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  })

  return !!existingOrder
}

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema)

export { Ticket }
