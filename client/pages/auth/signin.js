import React, { useState } from "react"
import FormContainer from "../../components/FormContainer"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { Form, Button } from "react-bootstrap"
import axios from "axios"
import Router from 'next/router'

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)


  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("/api/users/signin", {
        email,
        password,
      })
      setLoading(true)
      setEmail('')
      setPassword('')

      Router.push('/')
    } catch (err) {
      setErrors(err.response.data.errors)
    }

    setLoading(false)
  }

  return (
    <FormContainer>
      <h1>Sign in</h1>
        {errors.length > 0 &&
          errors.map((err) => (
            <Message key={err.message} variant="danger">
              {err.message}
            </Message>
          ))}
          {loading && <Loader/>}
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          LOGIN
        </Button>
      </Form>
    </FormContainer>
  )
}


export default SignIn
