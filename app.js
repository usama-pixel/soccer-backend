const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose')

const teamRoutes = require('./routes/team')

const app = express()

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json())
app.use((req, res, next) => { // using this code to avoid CORS error
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, GET, POST, PATCH, DELETE, OPTIONS'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Auth-Token, Content-Type, Authorization') // we could also use '*' here if we want to allow all the headers
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})
app.use(teamRoutes)

app.listen(PORT, () => {
  mongoose.connect('mongodb://127.0.0.1:27017/soccer')
    .then(() => {
      console.log('Database connected');
      console.log('Listening on port');
    })
    .catch(err => console.log(err))
})