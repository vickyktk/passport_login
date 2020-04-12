const mysql = require('mysql')
var keys=require('./../config/keys')

var conn =mysql.createConnection({
    host:keys.mysql.loaclhost,
    user:keys.mysql.user,
    password:keys.mysql.password,
    database:keys.mysql.database
})

conn.connect();
module.exports = conn;
// conn.connect((err)=>{
//     if(err) throw err;
//     conn.query('INSERT INTO user(name,email,country) VALUES("Waqas2","Waqas2ktk81@gmail.com","Pakistani")',(err,result)=>{
//         if(err) throw err;
//         console.log('1 Entry ,the Inserted id id '+ result.insertId + ' Rows affected '+result.affectedRows)
//     })
// })
// var creaeTable="INSERT INTO Products(Author,Title,Description,Price) VALUE('Waqas','WATCH','THE BRANDED WATCH','399.0')"
// conn.query(creaeTable,(err,result)=>{
//     if(err) throw err;
//     console.log('record inserted with id' + result.insertId)
// })