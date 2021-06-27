import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req: any, res: any) => {
  res.send('Hi there')
})


export {router as signoutRouter}



