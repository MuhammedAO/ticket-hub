import request from "supertest"
import { app } from "../../app"

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "random@test.com",
      password: "random",
    })
    .expect(201)
})

it("it returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "random",
      password: "random",
    })
    .expect(400)
})

it("it returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "random@me.com",
      password: "ran",
    })
    .expect(400)
})

it("it returns a 400 with an missing email and password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400)
})

it('disallows duplicate emails', async () => {
  await request(app)
        .post("/api/users/signup")
        .send({
          email: "random@test.com",
          password: "random",
        })

        .expect(201)
  await request(app)
        .post("/api/users/signup")
        .send({
          email: "random@test.com",
          password: "random",
        })
        .expect(400)
})

it("sets a cookie after successful signup", async () => {
 const response = await request(app)
        .post("/api/users/signup")
        .send({
          email: "random@test.com",
          password: "random",
        })
       .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
})