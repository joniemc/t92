const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/vehiculos/',(req,res)=>{
    const sql = 'SELECT * FROM vehiculo';
    pool.query(sql,(err, results)=>{
        if(err){
            return res.status(500).json({status:500,message:'Error en la consulta...'});
        }

        res.status(200).json({status:200,message:'Success',results});
    });
});

router.post('/vehiculos',(req, res)=>{
    let vehiculo = req.body;

    if(!vehiculo.marca || !vehiculo.modelo || !vehiculo.anio){
        return res.status(403).json({status:403,message:'Todos los campos son requeridos...'});
    }
    
    const sql ="INSERT INTO vehiculo (marca,modelo,anio) VALUES(?,?,?)";
    pool.query(sql,[vehiculo.marca,vehiculo.modelo,vehiculo.anio],(err, results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({status:500,message:'Error al insertar el registro...'});
        }
        vehiculo.codigo = results.insertId;
        res.status(201).json({status:201,message:'Success',vehiculo});        
    });

});

router.put('/vehiculos',(req,res)=>{
    
    let vehiculo = req.body;

    if(!vehiculo.marca || !vehiculo.modelo || !vehiculo.anio || !vehiculo.codigo){
        return res.status(403).json({status:403,message:'Todos los campos son requeridos...'});
    }
    
    const sql ="UPDATE vehiculo SET marca =? , modelo=? , anio =? WHERE codigo =?";
    pool.query(sql,[vehiculo.marca,vehiculo.modelo,vehiculo.anio,vehiculo.codigo],(err, results)=>{
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

router.get('/vehiculos/:codigo',(req,res)=>{
    let codigo = req.params.codigo;
    if(!codigo){
        return res.status(403).json({status:403,message:'El codigo del vehiculo es un parametro requerido...'});
    }

    const sql ="SELECT * FROM vehiculo WHERE codigo = ?";
    pool.query(sql,[codigo],(err, results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({status:500,message:'Error al insertar el registro...'});
        }
        
        res.status(200).json({status:200,message:'Success',results});        
    });
});

router.delete('/vehiculos/:codigo',(req,res)=>{
    let codigo = req.params.codigo;
    if(!codigo){
        return res.status(403).json({status:403,message:'El codigo del vehiculo es un parametro requerido...'});
    }

    const sql ="DELETE FROM vehiculo WHERE codigo = ?";
    pool.query(sql,[codigo],(err, results)=>{
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

module.exports = router;