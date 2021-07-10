import React, { useState } from "react"
import FormContainer from "../../components/FormContainer"
import Link from "next/link"
import { Form, Button, Row, Col } from "react-bootstrap"
import axios from "axios"
import Message from "../../components/Message"
import Loader from "../../components/Loader"

function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)


  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("/api/users/signup", {
        email,
        password,
      })
      setLoading(true)
      setEmail('')
      setPassword('')
    
      console.log(response.data)
    } catch (err) {
      setErrors(err.response.data.errors)
    }

    setLoading(false)
  }

  return (
    <FormContainer>
      <h1>Sign up</h1>
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
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account?
          <Link href="/">
            <a> Login</a>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default SignUp
