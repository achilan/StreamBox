// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const Movie = require('./models/Movie');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { exec } = require('child_process');
require('dotenv').config();

// Crear el directorio de subida si no existe
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Configuración de Multer para manejar la subida de archivos

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Crear la app Express
const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servir archivos estáticos
app.use(express.urlencoded({ extended: true }));

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/movieDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log(err));

// Rutas

// Crear una nueva película
app.post('/movies', upload.single('movieFile'), async (req, res) => {
  const { title, posterUrl } = req.body;
  const movieFile = req.file ? req.file.path : null;

  if (!title || !posterUrl || !movieFile) {
    return res.status(400).json({ message: 'Faltan datos necesarios' });
  }

  const newMovie = new Movie({ title, posterUrl, movieFile });
  try {
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la película', error: err });
  }
});

// Obtener todas las películas
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las películas', error: err });
  }
});

// Obtener una película por ID
app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener la película', error: err });
  }
});

// Actualizar una película
app.put('/movies/:id', upload.single('movieFile'), async (req, res) => {
  const { title, posterUrl } = req.body;
  const movieFile = req.file ? req.file.path : null;

  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }

    movie.title = title || movie.title;
    movie.posterUrl = posterUrl || movie.posterUrl;
    movie.movieFile = movieFile || movie.movieFile;

    await movie.save();
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la película', error: err });
  }
});

// Eliminar una película
app.delete('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    res.status(200).json({ message: 'Película eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la película', error: err });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
