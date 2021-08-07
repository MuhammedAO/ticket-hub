import React, { useState } from "react"
import { Button } from "react-bootstrap"
import Router from "next/router"
import useRequest from "../../hooks/use-request"

const TicketShow = ({ ticket }) => {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  })

  return (
    <div className="container">
      <h1>{ticket.title}</h1>
      <h4>Price:$ {ticket.price} </h4>
      {errors}
      <Button onClick={() => doRequest()} type="submit" variant="primary">
        Purchase
      </Button>
    </div>
  )
}

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query
  const { data } = await client.get(`/api/tickets/${ticketId}`)

  return { ticket: data }
}

export default TicketShow
