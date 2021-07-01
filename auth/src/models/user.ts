import mongoose from "mongoose"

//properties required to create a new user
interface UserAttrs {
  email: string
  password: string
}

//properties describing  a user model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}


//properties describing a single user Document.
interface UserDoc extends mongoose.Document {
  email: string
  password: string
}


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema)


export { User }
