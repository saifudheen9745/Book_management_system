const Router = require('express').Router()
const { addAuthor, listAuthor, listAllBooksOfAAuthour, editAuthorName, deleteAnAuthor } = require('../Controllers/Author/authourController')


Router.post('/',addAuthor)
Router.get('/',listAuthor)
Router.get('/:id',listAllBooksOfAAuthour)
Router.patch('/:id',editAuthorName)
Router.delete('/:id',deleteAnAuthor)


module.exports = Router