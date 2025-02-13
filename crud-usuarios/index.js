const express = require('express');
const app = express();
const PORT = 3000;

app.get('/usuarios/:id/:edad',(req,res)=>{
    const id = req.params.id;
    const edad = req.params.edad;
    res.status(200).json({id: id, edad:edad});
});

app.get('/productos',(req,res)=>{
    const id = req.query.id;
    const nombre = req.query.nombre;
    res.status(200).json({id: id,nombre:nombre});
});
app.get('/usuarios/:id',(req,res)=>{
    const id = req.params.id;
    res.status(200).json({id: id});
});
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});