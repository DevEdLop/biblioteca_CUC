const express = require('express');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/formulario.html');
});
app.post('/prestamo', (req, res) => {
    console.log(req.body)
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const titulo = req.body.titulo;
    const autor = req.body.autor;
    const editorial = req.body.editorial;
    const anio = req.body.anio;

    const data = `${id}, ${nombre}, ${apellido}, ${titulo}, ${autor}, ${editorial}, ${anio}\n`;
    const filename = `data/id_${id}.txt`;
    fs.writeFile(filename, data, (err) => {
        if (err) throw err;
        console.log(`Archivo ${filename} creado.`);
        // Descargar el archivo de texto
        res.download(filename);
    });
});

app.get('/error.html', (req, res) => {
    res.sendFile(__dirname + '/public/error.html');
});

app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));