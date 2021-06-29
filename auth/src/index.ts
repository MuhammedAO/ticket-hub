import { currentUserRouter } from "./routes/current-user"
import { signinRouter } from "./routes/signin"
import { signoutRouter } from "./routes/signout"
import { signupRouter } from "./routes/signup"
import { errorHandler } from './middlewares/error-handler';

const express = require('express')

const app = express()

app.use(express.json())

app.use(currentUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)

app.use(errorHandler)


app.listen(3000, () => console.log('listening on 3000'))