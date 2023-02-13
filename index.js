const express = require('express')
const logger = require('morgan')
const fs = require('fs')
const app = express()


const author = require('./Routes/authorRoutes')
const book = require('./Routes/bookRoutes')

app.use(logger('combined'))
app.use(express.json())

app.use(logger('common', {
    stream: fs.createWriteStream('./Logs/logs.txt', {flags: 'a'})
}));

app.use('/book',book)
app.use('/author',author)


app.listen(5000,()=>{
    console.log("Server started on port 5000");
})
