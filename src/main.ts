import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
<<<<<<< Updated upstream
=======
import BancoMysql from './db/banco-mysql'
import { request } from 'https'
>>>>>>> Stashed changes

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

//DELETAR 
app.delete("/produtos/:id",async(req,res)=>{
    console.log(req.params.id)
    const query= "DELETE FROM produtos  WHERE id = "
    const párametros = [req.params.id]

    const banco = new BancoMysql()
    await banco.criarConexao()
    const result = await banco.consultar(query,parametros)
    await banco.finalizarConexao()
    res.send("Produto Excluido com Sucesso id:"+req.params.id)
})

//ALTERAR
app.put("/produtos/:id",(req,res)=>{
    console.log(req.params.id)
})




app.listen(8000, () => {
    console.log("Iniciei o servidor")
})
