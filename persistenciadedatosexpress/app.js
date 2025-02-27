const express=require('express');
const mysql = require('mysql2');
const app =express();
const PORT =3000;

app.use(express.json());

const conexion = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'db_vehiculos'
});

conexion.getConnection((error, connection)=>{
    if(error){
        console.log("Error de conexión....");
    }
    else{
        console.log("Conexión exitosa....");
    }
});

app.get('/api/vehiculos/',(req,res)=>{
    const sql = 'SELECT * FROM vehiculo';
    conexion.query(sql,(err, results)=>{
        if(err){
            return res.status(500).json({status:500,message:'Error en la consulta...'});
        }

        res.status(200).json({status:200,message:'Success',results});
    });
});

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});