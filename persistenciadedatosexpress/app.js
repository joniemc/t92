const express=require('express');
const app =express();
require('dotenv').config();

const PORT = process.env.PORT;

const vehiculoRoutes = require('./routes/vehiculos');
const authUserRoutes = require('./routes/authUser');

app.use(express.json());

app.use('/api',vehiculoRoutes);
app.use('/api',authUserRoutes);

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});