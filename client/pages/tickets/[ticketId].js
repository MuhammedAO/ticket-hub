import React, { useState } from "react"
import axios from "axios"
import { Button } from "react-bootstrap"
import Message from "../../components/Message"

const TicketShow = ({ ticket }) => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const Perform = async () => {
    try {
      const response = await axios.post("/api/orders", {
        ticketId: ticket.id,
      })
      console.log(response.data)
      setLoading(true)
    } catch (err) {
      setErrors(err.response.data.errors)
    }

    setLoading(false)
  }

  return (
    <div className="container">
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors.length > 0 &&
        errors.map((err) => (
          <Message key={err.message} variant="danger">
            {err.message}
          </Message>
        ))}
      {loading && <Loader />}
      <Button onClick={Perform} type="submit" variant="primary">
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
