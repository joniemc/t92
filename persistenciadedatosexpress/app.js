const express=require('express');
const app =express();
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();


const PORT = process.env.PORT;

const vehiculoRoutes = require('./routes/vehiculos');
const authUserRoutes = require('./routes/authUser');

app.use(express.json());
app.use(cors());

app.use('/api',vehiculoRoutes);
app.use('/api',authUserRoutes);

app.get('/api/posts',async (req, res)=>{
    try{
        console.log(process.env.URL_API_TERCERO+'/posts');
        const otherResponse = await axios.get(process.env.URL_API_TERCERO+'/posts');
        
        res.status(200).json({status:200,message:'success',data:otherResponse.data});

    }catch(error){
        res.status(500).json({status:500,message:'Error al obtener los datos..'});
    }
});

app.post('/api/posts',async (req, res)=>{
    try{
        const posts = req.body;
        console.log(process.env.URL_API_TERCERO+'/posts');
        const otherResponse = await axios.post(process.env.URL_API_TERCERO+'/posts', posts);
        
        res.status(201).json({status:201,message:'success',data:otherResponse.data});

    }catch(error){
        res.status(500).json({status:500,message:'Error al obtener los datos..'});
    }
});


app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});