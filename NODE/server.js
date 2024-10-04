// server.js
const express = require('express');
const cors = require('cors'); // Importando o CORS
const db = require('./db'); // Importando a conexão do banco de dados

const app = express();
const PORT = 3000; // Porta do servidor

// Middleware para processar JSON
app.use(express.json());
app.use(cors()); // Usando o middleware CORS

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// ROTA GET para buscar todos os usuários
app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários: ', err);
            return res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
        res.json(results);
    });
});

// ROTA POST para adicionar um novo usuário
app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;

    // Verificando se todos os campos foram preenchidos
    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    // Usando placeholders (?) para prevenir SQL injection
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(query, [nome, email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar usuário: ', err);
            return res.status(500).json({ error: 'Erro ao adicionar usuário' });
        }
        res.status(201).json({ message: 'Usuário adicionado com sucesso', id: result.insertId });
    });
});
