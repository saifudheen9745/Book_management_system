const { store } = require("../../Storage/Storage")
const crypto = require('crypto')

const generateId = ()=>{
    let buf = crypto.randomBytes(5)
    return buf.toString('hex')   
}
module.exports = {
    addBooks:(req,res)=>{
        let duplicate
        if("Books" in store == false){
            store.Books = []
        }
        const {authorId,bookName,ISBN} = req.body
        store.Books.map(elem =>{
            if(elem.ISBN == ISBN){
                duplicate = true
            }
        })
        if(!duplicate){

            const obj = {
                bookId:generateId(),
                authorId,
                bookName,
                ISBN
            }
            store.Books.push(obj)
        }else{
            res.status(200).json({duplicateISBNFound:true})
        }
        res.status(200).json({Book:"Added to the list"})
    },
    listBook:(req,res)=>{
        if("Books" in store){
            res.status(200).json({"No.ofBooks":store.Books.length,Books:store.Books})
        }else{
            res.status(200).json({"No.ofBooks":0,Books:{}})
        }
    },
    getDetailsOfABook:async(req,res)=>{
        if("Authors" && "Books" in store){
            var book =  store.Books.map(elem => {
                if(elem.bookId == req.params.id){
                    return store.Authors.map(auth=>{
                        if(auth.id == elem.authorId){
                            let obj = {
                                name:auth.name,
                                elem
                            }
                            return obj
                        }
                    })
                }
            })
        }
        let bookDetails = {
            authorName:book[0][0].name,
            bookName:book[0][0].elem.bookName,
            authorId:book[0][0].elem.authorId,
            bookId:book[0][0].elem.bookId,
            ISBN:book[0][0].elem.ISBN
        }

        res.status(200).json(bookDetails)
    },
    editBookName:(req,res)=>{
        let duplicateIsbn = false
        const {authorId,bookName,ISBN} = req.body
        store.Books.map(book => {
            if(book.ISBN == ISBN && book.bookId != req.params.id){
                duplicateIsbn = true
            }
        })
        if(!duplicateIsbn){
            store.Books.map((book)=>{
                if(book.bookId == req.params.id){
                    book.bookName = bookName
                    book.authorId = authorId
                    book.ISBN = ISBN
                }
            })
            res.status(200).json({bookEdited:true})
        }else{
            res.status(200).json({bookEdited:false,duplicateISBN:true})
        }
        
    },
    deleteABook:(req,res)=>{
        if("Books" in store){
            store.Books.map((book,index) => {
                if(book.bookId == req.params.id){
                    store.Books.splice(index,1)
                }
            })
            res.status(200).json({deleted:true})
        }else{
            res.status(200).json({deleted:false})
        }
    }
}