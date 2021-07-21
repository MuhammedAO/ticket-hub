import express from 'express'
import "express-async-errors"
import cookieSession from "cookie-session"
import { errorHandler, NotFoundError, currentUser } from "@mhd-ticketx/ticket-x"
import { indexOrderRouter } from './routes'
import { showOrderRouter } from './routes/show'
import { newOrderRouter } from './routes/new'
import { deleteOrderRouter } from './routes/delete'



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
app.use(indexOrderRouter)
app.use(showOrderRouter)
app.use(newOrderRouter)
app.use(deleteOrderRouter)

app.all("*", async (req: any, res: any) => {
  throw new NotFoundError()
})

app.use(errorHandler)
