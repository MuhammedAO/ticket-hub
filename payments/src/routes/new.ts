import express, { Request, Response } from "express"
import { body } from "express-validator"
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from "@mhd-ticketx/ticket-x"
import { stripe } from "../stripe"
import { Order } from "../models/order"
import { Payment } from "../models/payment"
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher"
import { natsWrapper } from "../nats-wrapper"

const router = express.Router()

router.post(
  "/api/payments",
  requireAuth,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body

    //find order user is trying to pay for
    const order = await Order.findById(orderId)

    if (!order) {
      throw new NotFoundError()
    }
    //make sure order belongs to user
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError("Unauthorized to make this request")
    }
    //check if order is cancelled before attempting payment
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for an cancelled order")
    }

    const charge = await stripe.charges.create({
      currency: "usd",
      amount: order.price * 100,
      source: token,
    })

    const payment = Payment.build({
      orderId,
      stripeId: charge.id,
    })
    await payment.save()

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ id: payment.id })
  }
)

export { router as createChargeRouter }
