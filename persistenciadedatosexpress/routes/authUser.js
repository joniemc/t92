const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');

require('dotenv').config();

router.post('/login',async (req,res)=>{
    const {username,password} = req.body;

    const sql = 'select * from tbl_usuarios where username = ?';

    pool.query(sql,[username], async (err,resultado)=>{
        if(err){
            return res.status(500).json({status:500,message:'Error del servidor'});
        }

        if(resultado.length === 0){
            return res.status(401).json({status:401,message:'Credenciales invalidas...'});
        }

        let user = resultado[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({status:401,message:'Credenciales invalidas...'});
        }

        const token = jwt.sign(
            {id: user.codigo, username: user.username},
            process.env.SECRET_KEY,
            {expiresIn: '1h'}
        );
        res.json({status:200,message:'Success',token});
    });
});

router.post('/usuarios',authMiddleware ,async (req,res)=>{
    const {username,password} = req.body;

    const sql = 'insert into tbl_usuarios (username,password) values(?,?)';

    const saltRound = 10;
    const passwordEncrypt = await bcrypt.hash(password, saltRound);

    pool.query(sql,[username,passwordEncrypt],  (err,resultado)=>{
        if(err){
            return res.status(500).json({status:500,message:'Error del servidor'});
        }

        res.json({status:200,message:'Success', codigo: resultado.insertId});
    });
});

router.get('/usuarios',authMiddleware ,async (req,res)=>{
    
    const sql = 'select codigo, username, email, telefono_movil from tbl_usuarios ';

    pool.query(sql,  (err,resultado)=>{
        if(err){
            return res.status(500).json({status:500,message:'Error del servidor'});
        }

        res.json({status:200,message:'Success', data: resultado});
    });
});

module.exports = router;
