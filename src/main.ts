import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express(); // Criação da instância do Express
app.use(express.json()); // Middleware para JSON
app.use(cors()); // Habilitar CORS para o seu frontend

// Rota para obter os jogos
app.get("/jogos", async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.dbhost || "localhost",
            user: process.env.dbuser || "root",
            password: process.env.dbpassword || "",
            database: process.env.dbname || "defaultdb",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        });
        const [result, fields] = await connection.query("SELECT * from jogos");
        await connection.end();
        res.send(result);
    } catch (e) {
        console.log(e);
        res.status(500).send("Server ERROR");
    }
});

// Rota para adicionar um novo jogo
app.post("/jogos", async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.dbhost || "localhost",
            user: process.env.dbuser || "root",
            password: process.env.dbpassword || "",
            database: process.env.dbname || "defaultdb",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        });
        const { codigojg, nome, informacaojg, preco, imagem } = req.body;
        const [result, fields] = await connection.query("INSERT INTO jogos VALUES (?,?,?,?,?)", [codigojg, nome, informacaojg, imagem, preco]);
        await connection.end();
        res.send(result);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

app.delete("/jogos/:codigojg", async (req, res) => {
    try {
    const connection = await mysql.createConnection({
        host: process.env.dbhost || "localhost",
        user: process.env.dbuser || "root",
        password: process.env.dbpassword || "",
        database: process.env.dbname || "defaultdb",
        port: process.env.dbport ? parseInt(process.env.dbport) : 3306
    });

    const query = "DELETE FROM jogos WHERE codigojg = ?";
    const parametros = [req.params.codigojg];
    
    
        // O resultado da consulta será um array com um objeto 'ResultSetHeader'
        const [result] = await connection.query(query, parametros);
        await connection.end();
        
        // 'result' é um 'ResultSetHeader', então você pode acessar 'affectedRows'
        if ((result as mysql.ResultSetHeader).affectedRows > 0) {
            res.send("Produto excluído com sucesso! ID: " + req.params.codigojg);
        } else {
            res.status(404).send("Jogo não encontrado.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao excluir o jogo.");
    }
});

// Rota para atualizar um jogo (ainda em construção)
app.put("/jogos/:codigojg", (req, res) => {
    console.log(req.params.codigojg);
    // Aqui você pode adicionar a lógica para atualizar o jogo
});

// Inicializando o servidor
app.listen(8000, () => {
    console.log("Servidor Iniciado");
});
