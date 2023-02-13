const { addBooks, listBook, getDetailsOfABook, editBookName, deleteABook } = require('../Controllers/Book/bookController')

const Router = require('express').Router()

Router.post('/',addBooks)
Router.get('/',listBook)
Router.get('/:id',getDetailsOfABook)
Router.patch('/:id',editBookName)
Router.delete('/:id',deleteABook)


module.exports = Router