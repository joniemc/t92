const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const router = express.Router();

require('dotenv').config();


router.post('/login',(req,res)=>{
    const {username,password} = req.body;

    const sql = 'select * from tbl_usuarios where username = ? and password = ?';

    pool.query(sql,[username,password],(err,resultado)=>{
        if(err){
            return res.status(500).json({status:500,message:'Error del servidor'});
        }

        if(resultado.length === 0){
            return res.status(401).json({status:401,message:'Credenciales invalidas...'});
        }

        let user = resultado[0];
        const token = jwt.sign(
            {id: user.codigo, username: user.username},
            process.env.SECRET_KEY,
            {expiresIn: '1h'}
        );
        res.json({status:200,message:'Success',token});
    });
});

module.exports = router;
