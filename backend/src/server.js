require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const perfilRoutes = require('./routes/perfil');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/perfil', perfilRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Servidor funcionando'
  });
});

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Servidor iniciado en puerto ${PORT}`
  );
});