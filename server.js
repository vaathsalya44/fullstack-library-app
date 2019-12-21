if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')     //for headers & footers
app.use(expressLayouts)
app.use(express.static('public'))       //for css, js, img
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))    //limit increase so can upload files

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
.then(() => {
  console.log('DB Connected.')
})
.catch(err => {
  console.log('Error Connecting to DB!')
})

app.use('/', indexRouter)
app.use('/authors', authorsRouter)

app.listen(process.env.PORT || 3000)