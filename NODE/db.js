// db.js
const mysql = require('mysql2');

// Criando conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost', // Endereço do servidor MySQL
    user: 'lorran',      // Seu usuário do MySQL
    password: '8121',      // Sua senha do MySQL
    database: 'meu_banco_de_dados' // Nome do banco de dados
});

// Testando a conexão
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL: ', err);
        return;
    }
    console.log('Conectado ao MySQL!');
});

module.exports = connection;
