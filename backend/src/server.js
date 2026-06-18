require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes      = require('./routes/auth');
const perfilRoutes    = require('./routes/perfil');
const adminRoutes     = require('./routes/admin');
const programasRoutes = require('./routes/programas');
const contactoRoutes  = require('./routes/contacto');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',      authRoutes);
app.use('/api/perfil',   perfilRoutes);
app.use('/api/admin',    adminRoutes);
app.use('/api/programas', programasRoutes);
app.use('/api/contacto', contactoRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Servidor funcionando',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
