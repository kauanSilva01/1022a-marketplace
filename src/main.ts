import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import BancoMysql from './db/banco-mysql'

const app = express()
app.use(express.json())
app.use(cors())


app.get("/jogos", async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "lojajogos",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        })
        const [result, fields] = await connection.query("SELECT * from jogos")
        await connection.end()
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send("Server ERROR")
    }
})
app.post("/jogos", async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "lojajogos",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        })
        const {codigojg,nome,informacaojg,preco,imagem} = req.body
        const [result, fields] = 
                    await connection.query("INSERT INTO jogos VALUES (?,?,?,?,?)",
                            [codigojg,nome,informacaojg,imagem,preco])
        await connection.end()
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

app.get("/login", async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "lojajogos",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        })
        const [result, fields] = await connection.query("SELECT * from usuario")
        await connection.end()
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send("Server ERROR")
    }
})
app.post("/login", async (req, res) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "lojajogos",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        })
        const {email, senha} = req.body
        const [result, fields] = 
                    await connection.query("INSERT INTO usuario VALUES (?,?)",
                            [email,senha])
        await connection.end()
        res.send(result)    
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})
app.listen(8000, () => {
    console.log("Iniciei o servidor")
})
