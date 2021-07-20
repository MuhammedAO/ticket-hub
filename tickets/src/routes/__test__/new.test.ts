import request from "supertest"
import { app } from "../../app"
import { Ticket } from "../../models/ticket"

jest.mock('../../nats-wrapper')

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({})
  expect(response.status).not.toEqual(404)
})

it("can only be accessed if a user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401)
})

it("status should !== 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({})
  expect(response.status).not.toEqual(401)
})

it("returns an error if invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 20,
    })
    .expect(400)

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      price: 20,
    })
    .expect(400)
})
it("returns an error if invalid price is provided ", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "Opera",
      price: -10,
    })
    .expect(400)

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "Opera",
    })
    .expect(400)
})

it("creates a ticket with valid parameters", async () => {
  let tickets = await Ticket.find({})
  expect(tickets.length).toEqual(0)

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "Opera",
      price: 34,
    })
    .expect(201)

  tickets = await Ticket.find({})
  expect(tickets.length).toEqual(1)
})
