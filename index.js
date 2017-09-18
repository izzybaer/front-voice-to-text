require('dotenv').config()
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('common'))
app.use(cors({
  origin: process.env.CORS_ORIGINS,
  credentials: true,
}))
app.use(express.static(`${__dirname}/build`))
app.get('*', (req, res) => res.sendFile(`${__dirname}/build/index.html`))

app.listen(process.env.PORT, () => {
  console.log('__SERVER_RUNNING__', process.env.PORT)
})
