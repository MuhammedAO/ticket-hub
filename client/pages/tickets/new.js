import React, { useState } from "react"
import FormContainer from "../../components/FormContainer"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { Form, Button } from "react-bootstrap"
import axios from "axios"
import Router from "next/router"

function NewTicket() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)

  const onBlur = () => {
    const value = parseFloat(price)

    if (isNaN(value)) {
      return
    }

    setPrice(value.toFixed(2))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/tickets", {
        title,
        price,
      })

      setLoading(true)
      setTitle("")
      setPrice("")
      
      Router.push('/')
      console.log(response.data)
    } catch (err) {
      setErrors(err.response.data.errors)
    }
    setLoading(false)
  }

  return (
    <FormContainer>
      <h1>Create a ticket</h1>
      {errors.length > 0 &&
        errors.map((err) => (
          <Message key={err.message} variant="danger">
            {err.message}
          </Message>
        ))}
      {loading && <Loader />}
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            placeholder="Ticket Title"
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onBlur={onBlur}
            value={price}
            placeholder="Ticket Price"
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </FormContainer>
  )
}

export default NewTicket
