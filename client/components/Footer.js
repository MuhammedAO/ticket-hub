import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Link from "next/link"

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
          <Link href="https://github.com/MuhammedAO">
           <a>Github</a>
          </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
