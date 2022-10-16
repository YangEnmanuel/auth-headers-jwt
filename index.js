import express from 'express'
import jwt from 'jsonwebtoken'
// Working with local variables
import 'dotenv/config'

import middleware from './middleware.js'
import { items } from './shop.js'

const app = express()

// Preparing for reading json
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Welcome')
  // res.redirect('/shop')
})

// After its middleware, show the shop
app.get('/shop', middleware, (req, res) => {
  if (req.user === 'admin') res.json({ message: `Hello admin`, items })
  else
    res.json({
      message: `Hello ${req.user}`,
      items: items.filter((e) => e.customer === req.user),
    })
})

// Create a token for the user that is logging
app.post('/login', (req, res) => {
  const { user } = req.body

  if (!user) res.status(404).json({ error: 'No credentials given' })
  else {
    const token = jwt.sign({ user }, process.env.SECRET_KEY)

    res.json({ message: `Welcome ${user}`, token })
  }
})

// If there is a .env file with the port take it, or 3000
app.listen(process.env.PORT || 3000)
console.log('Server running')
