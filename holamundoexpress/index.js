const express = require('express');
const app = express();
const PORT = 3000;

app.get('/',(req,res)=>{
    res.send('¡Hola Mundo de Express...!');
});

app.get('/nuevomensaje',(req,res)=>{
    res.send('¡Este es un mensaje diferente...!');
});

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
