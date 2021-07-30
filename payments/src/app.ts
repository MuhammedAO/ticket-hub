import express from "express"
import "express-async-errors"
import cookieSession from "cookie-session"
import { errorHandler, NotFoundError, currentUser } from "@mhd-ticketx/ticket-x"



export const app = express()

app.set("trust proxy", true)
app.use(express.json())

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
)

app.use(currentUser)


app.all("*", async (req: any, res: any) => {
  throw new NotFoundError()
})

app.use(errorHandler)
