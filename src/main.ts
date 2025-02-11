import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import BancoMysql from './db/banco-mysql';

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
//Puxar Jogos 
app.get("/jogos", async (req, res) => {
    try {
        const banco = new BancoMysql()
        await banco.criarConexao()
        const result = await banco.listar()
        await banco.finalizarConexao()
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send("Server ERROR")
    }
})
//Puxar jogos pelo ID
app.get("/jogos/:codigojg", async (req, res) => {
    try {
        
        const banco = new BancoMysql()
        await banco.criarConexao()
        const result = await banco.listarPorId(req.params.codigojg)
        await banco.finalizarConexao()
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send("Server ERROR")
    }
})

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
//Delete
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

//Alterar Jogos
app.put("/jogos/:codigojg",async(req,res)=>{
    const {nome,informacaojg,preco,imagem} = req.body
    const jogo = {nome,informacaojg,preco,imagem}
    const banco = new BancoMysql()
    await banco.criarConexao()
    const result = await banco.alterar(req.params.codigojg,jogo)
    await banco.finalizarConexao()
    res.status(200).send("Produto alterado com sucesso id: "+req.params.codigojg)
})

// Inicializando o servidor
app.listen(8000, () => {
    console.log("Servidor Iniciado");
});
