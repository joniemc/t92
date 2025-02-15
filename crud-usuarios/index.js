const express = require('express');
const app = express();
const PORT = 3000;

const productos = [
    {
      id: 1,
      nombre: "Laptop",
      descripcion: "Laptop HP con procesador Intel Core i7",
      precio: 1200,
      stock: 10,
      categoria: "Electrónica"
    },
    {
      id: 2,
      nombre: "Smartphone",
      descripcion: "Teléfono móvil Samsung Galaxy S21",
      precio: 900,
      stock: 15,
      categoria: "Electrónica"
    },
    {
      id: 3,
      nombre: "Teclado Mecánico",
      descripcion: "Teclado mecánico RGB para gaming",
      precio: 80,
      stock: 20,
      categoria: "Accesorios"
    }
  ];


app.use(express.json());

app.get('/usuarios/:id/:edad',(req,res)=>{
    const id = req.params.id;
    const edad = req.params.edad;
    res.status(200).json({id: id, edad:edad});
});

app.get('/otra/:id/:edad',(req,res)=>{
    const id = req.params.id;
    const edad = req.params.edad;
    res.status(200).json({id: id, edad:edad});
});

app.get('/productos',(req,res)=>{
    res.status(200).json({status:200,message:'Success',productos});
});

app.get('/productos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    let producto = productos.find(prod => prod.id === id);
    res.json({status:200,message:'Success',producto});
});

app.post('/productos',(req, res)=>{
    let producto = req.body;
    productos.push(producto);
    res.json({status:200,message:'Success',producto});
});

app.put('/productos',(req,res)=>{
    let producto = req.body;
    let exist = false;
    
    productos.forEach(prod =>{
        if(prod.id === producto.id){
            exist=true;
            prod.nombre=producto.nombre;
            prod.descripcion= producto.descripcion;
            prod.categoria=producto.categoria;
        }
    });

    if(exist){
        res.json({status:200,message:'Success',producto});
    }
    else{
        res.status(400).json({status:400,message:'Bad Request',producto});
    }

});

app.get('/productospornombre/:nombre',(req,res)=>{
    const nombre = req.params.nombre;
    let producto = productos.find(prod => prod.nombre === nombre);
    res.json({status:200,message:'Success',producto});
});

app.get('/usuarios',(req,res)=>{
    
    res.status(200).json({message: 'usuarios'});
});


app.get('/usuarios/:id',(req,res)=>{
    const id = req.params.id;
    res.status(200).json({id: id});
});

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});