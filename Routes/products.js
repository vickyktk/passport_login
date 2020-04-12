const express=require('express')
const app =express.Router()
var conn = require('../Model/db')




app.get('/',(req,res)=>{
    var select =`SELECT * FROM Products`;
    conn.query(select,(err,result)=>{
        if(err) throw err;
        res.render('products',{result:result}) 
    })    
})

app.get('/add',(req,res)=>{
        res.render('dashboard') 
})

app.post('/add',(req,res)=>{
    var Title=req.body.Title;
    var Desc=req.body.Desc;
    var Price=req.body.Price;
    var Author=req.body.Author

    req.checkBody('Title','Name is required').notEmpty()
    req.checkBody('Desc','Description is required').notEmpty()
    req.checkBody('Price','Please Specify the Price').notEmpty()

     let  costumErrors=req.validationErrors();
    if(costumErrors.length>0){
        res.render('Dashboard',{
            costumErrors,
            Title,
            Desc,
            Price
        })
        console.log(costumErrors)
    }else{

        var add=`INSERT INTO Products(Author,Title,Description,Price) VALUES('${Author}','${Title}','${Desc}','${Price}')`;
        conn.query(add,(err,result)=>{
            if(err) throw err; 
        req.flash('success_msg','The Item is added')
        res.redirect('/Dashboard')
        console.log(req.body)

        })
    }
})


app.get('/edit/:id',(req,res)=>{
    var id = req.params.id;
    var select =`SELECT * FROM Products WHERE id=${id}`
    conn.query(select,(err,result)=>{
        if(err) throw err;
        res.render('editPro',{
            result
        })
    })
})




app.post('/edit/:id',(req,res)=>{

    var id=req.params.id;
    var Title=req.body.Title;
    var Description=req.body.Desc;
    var Price=req.body.Price;
    var result=[{id,Title,Description,Price}];

    req.checkBody('Title','Title is required').notEmpty()
    req.checkBody('Desc','Description is required').notEmpty()
    req.checkBody('Price','Please Specify the Price').notEmpty()

     let  costumErrors=req.validationErrors();
    if(costumErrors.length>0){
        res.render('editPro',{
            costumErrors,
            result
        })
        console.log(costumErrors)
    }else{

        var add=`UPDATE Products SET Title = '${Title}',Description='${Description}',Price='${Price}' WHERE id=${id}`;
        conn.query(add,(err,result)=>{
            if(err) throw err;
            
        req.flash('success_msg','The Item is Update')
        res.redirect('/products')
        

        })
    }
})


app.delete('/:id',(req,res)=>{
    var id = req.params.id;
    var DELETE =`DELETE FROM Products WHERE id=${id}`
    conn.query(DELETE,(err,result)=>{
        if(err) throw err;
        res.send('Success')
    })
})



module.exports=app