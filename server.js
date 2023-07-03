const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Configurar la conexión a la base de datos
mongoose.connect('mongodb://id20986610_root:Taller2023#@localhost/equipos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir el modelo de datos para el equipo de computo
const equipoSchema = new mongoose.Schema({
  nombreCliente: String,
  serial: String,
  telefono: String,
  servicio: String,
  observaciones: String,
});

const Equipo = mongoose.model('Equipo', equipoSchema);

// Configurar las rutas de la API REST
app.use(express.json());

app.get('/equipos', async (req, res) => {
  try {
    const equipos = await Equipo.find();
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los equipos' });
  }
});

app.post('/equipos', async (req, res) => {
  try {
    const equipo = new Equipo(req.body);
    await equipo.save();
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el equipo' });
  }
});

app.put('/equipos/:id', async (req, res) => {
  try {
    const equipo = await Equipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el equipo' });
  }
});

// Configurar el servidor estático para servir los archivos HTML, CSS y JS
app.use(express.static(__dirname));

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
