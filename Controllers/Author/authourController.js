const { store } = require("../../Storage/Storage")
const crypto = require('crypto')

const generateId = ()=>{
    let buf = crypto.randomBytes(5)
    return buf.toString('hex')   
}

module.exports = {
    addAuthor:async(req,res)=>{
        try{

            let duplicate
            
       if("Authors" in store == false){
           store.Authors = []
        }
        store.Authors.map(elem => {
            if(req.body.Name == elem.name){
                duplicate = true
            }
        })
        if(!duplicate){
            const obj = {
                id:generateId(),
                name:req.body.Name
            }
            store.Authors.push(obj)
        }else{
            console.log("sadfasfd");
            res.status(400).json({duplicateFound:true})
        }
        res.status(200).json(store)
    }catch(err){
        
    }
    },
    listAuthor:(req,res)=>{  
        res.json(store.Authors)
    },
    listAllBooksOfAAuthour:(req,res)=>{
        if("Authors" && "Books" in store){
           let books = store.Books.filter(elem => {
            if(elem.authorId == req.params.id){
                return elem
            }
            return
           })
           let Author = store.Authors.map(elem=>{
            if(elem.id == req.params.id){
                return elem.name
            }
           })
           res.status(200).json({Author,"No.of.books":books.length,books})
        }else{
            res.status(200).json({books:{}})
        }
    },
    editAuthorName:(req,res)=>{
        let duplicate = false
        const authorId = req.params.id
        const newName = req.body.name
        if("Authors" in store){
            store.Authors.map((elem)=>{
                if(elem.name == newName){
                    duplicate = true
                }
            })
            if(!duplicate){
                store.Authors.map(elem=>{
                    if(elem.id == authorId){
                        elem.name = newName
                    }
                })
                res.status(200).json({nameChanged:true})
            }else{
                res.status(200).json({nameChanged:false,duplicateName:true})
            }
        }
        res.status(200).json({nameChanged:false})

    },
    deleteAnAuthor:(req,res)=>{
        if("Authors" in store){
            store.Authors.map((author,index) => {
                if(author.id == req.params.id){
                    store.Authors.splice(index,1)
                }
            })
            res.status(200).json({deleted:true})
        }else{
            res.status(200).json({deleted:false})
        }
    }
}