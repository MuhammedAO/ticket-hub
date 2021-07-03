import express, { Request, Response } from "express"
import { body } from "express-validator"
import jwt from 'jsonwebtoken'


import { User } from "../models/user"
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router()

router.get("/api/users/signup", (req: any, res: any) => {
  res.send("Hello world")
})

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be a valid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be 4-20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new BadRequestError("email already exists")
    }

    const user = User.build({ email, password })

    await user.save()

    //generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    )

    //store it on the session{}
    req.session = {
      jwt: userJwt,
    }

    res.status(201).send(user)
  }
)

export { router as signupRouter }
