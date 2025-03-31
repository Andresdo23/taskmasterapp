const express = require('express');
const cors = require('cors');
const Parse = require('parse/node'); 
require('dotenv').config();

// Configuração do Express
const app = express();

app.use(express.json());
app.use(cors());

// Configuração do Parse Server
Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JS_KEY);
Parse.serverURL = process.env.PARSE_SERVER_URL;

// Rota para acessar dados
app.get('/api/data', async (req, res) => {
  try {
    const query = new Parse.Query('Tasks');  // Altere para a sua classe no Back4App
    const results = await query.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
  }
});

// Rota para a raiz
app.get('/', (req, res) => {
  res.send('Backend Express funcionando!');
});

// Exporte a função para o Vercel
module.exports = app;
