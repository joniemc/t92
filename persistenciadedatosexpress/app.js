const express=require('express');
// instalar la libreria de mysql2 donde se encuentra el driver de conexión (npm install mysql2)
// importar la libreria en express
const mysql = require('mysql2');
const app =express();
const PORT =3000;

app.use(express.json());

// configurar las propiedades de la conexión a la base de datos
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

app.post('/api/vehiculos',(req, res)=>{
    let vehiculo = req.body;

    if(!vehiculo.marca || !vehiculo.modelo || !vehiculo.anio){
        return res.status(403).json({status:403,message:'Todos los campos son requeridos...'});
    }
    
    const sql ="INSERT INTO vehiculo (marca,modelo,anio) VALUES(?,?,?)";
    conexion.query(sql,[vehiculo.marca,vehiculo.modelo,vehiculo.anio],(err, results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({status:500,message:'Error al insertar el registro...'});
        }
        vehiculo.codigo = results.insertId;
        res.status(201).json({status:201,message:'Success',vehiculo});        
    });

});

app.put('/api/vehiculos',(req,res)=>{
    
    let vehiculo = req.body;

    if(!vehiculo.marca || !vehiculo.modelo || !vehiculo.anio || !vehiculo.codigo){
        return res.status(403).json({status:403,message:'Todos los campos son requeridos...'});
    }
    
    const sql ="UPDATE vehiculo SET marca =? , modelo=? , anio =? WHERE codigo =?";
    conexion.query(sql,[vehiculo.marca,vehiculo.modelo,vehiculo.anio,vehiculo.codigo],(err, results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({status:500,message:'Error al actualizar el registro...'});
        }
        
        if(results.affectedRows === 0){
            return res.status(404).json({status:404,message:'Vehiculo no encontrado...'});
        }
        
        res.status(201).json({status:201,message:'Success',vehiculo});        
    });
});

app.get('/api/vehiculos/:codigo',(req,res)=>{
    let codigo = req.params.codigo;
    if(!codigo){
        return res.status(403).json({status:403,message:'El codigo del vehiculo es un parametro requerido...'});
    }

    const sql ="SELECT * FROM vehiculo WHERE codigo = ?";
    conexion.query(sql,[codigo],(err, results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({status:500,message:'Error al insertar el registro...'});
        }
        
        res.status(200).json({status:200,message:'Success',results});        
    });
});

app.delete('/api/vehiculos/:codigo',(req,res)=>{
    let codigo = req.params.codigo;
    if(!codigo){
        return res.status(403).json({status:403,message:'El codigo del vehiculo es un parametro requerido...'});
    }

    const sql ="DELETE FROM vehiculo WHERE codigo = ?";
    conexion.query(sql,[codigo],(err, results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({status:500,message:'Error al insertar el registro...'});
        }

        if(results.affectedRows === 0){
            return res.status(404).json({status:404,message:'Vehiculo no encontrado...'});
        }
        
        res.status(201).json({status:201,message:'Registro eliminado con exito'});        
    });
});

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});