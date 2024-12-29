require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());

app.use(cors());

// Rotas
app.use('/users', userRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
