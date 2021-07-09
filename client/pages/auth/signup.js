import React, {useState} from 'react'
import FormContainer from '../../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Link from 'next/link'

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)
  }

  return (
    <FormContainer>
      <h1>Sign up</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Register</Button>
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
