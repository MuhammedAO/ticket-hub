import request from "supertest"
import { app } from "../../app"
import { currentUser } from "../../middlewares/current-user"

it("responds with details about the current user", async () => {
  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "random@test.com",
      password: "random",
    })
    .expect(201)

  const cookie = authResponse.get("Set-Cookie")

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200)

  expect(response.body.currentUser.email).toEqual("random@test.com")
})
