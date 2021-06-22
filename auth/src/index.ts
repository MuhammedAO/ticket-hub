const express = require('express')

const app = express()

app.use(express.json())

app.get('/api/users/currentuser', (req: any, res: any) => {
  res.send('Hello world')
})

app.listen(3000, () => console.log('listening on 3000'))