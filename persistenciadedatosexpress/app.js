const express=require('express');
const app =express();
require('dotenv').config();

const PORT = process.env.PORT;

const vehiculoRoutes = require('./routes/vehiculos');

app.use(express.json());

app.use('/api',vehiculoRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});