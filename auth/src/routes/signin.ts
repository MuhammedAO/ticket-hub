import express, { Request, Response } from "express"
import { body } from "express-validator"
import jwt from "jsonwebtoken"

import { validateRequest } from "@mhd-ticketx/ticket-x"
import { User } from "../models/user"
import { BadRequestError } from "@mhd-ticketx/ticket-x"
import { Password } from "../services/password"

const router = express.Router()

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must provide a provide"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials")
    }

    const passwordMatch = Password.compare(existingUser.password, password)

    if (!passwordMatch) {
      throw new BadRequestError("invalid credentials")
    }

    //generate jwt
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    )

    //store it on the session{}
    req.session = {
      jwt: userJwt,
    }

    res.status(200).send(existingUser)
  }
)

export { router as signinRouter }
