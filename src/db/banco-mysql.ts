import mysql , { Connection, RowDataPacket } from 'mysql2/promise'
class BancoMysql{
    //Atributos de uma classe
    connection:Connection|null = null
    
    //Métodos
    async criarConexao(){
        this.connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "defaultdb",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        })
    }
    async consultar(query:string,params?:any[]){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query(query,params)
        return result
    }
    async finalizarConexao(){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        await this.connection.end()
    }
    async listar(){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("SELECT * FROM jogos")
        return result
    }
    async inserir(jogos:{codigojg:number,nome:string,informacaojg:string,imagem:string,preco:string}){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("INSERT INTO produtos VALUES (?,?,?,?,?)",[jogos.codigojg,jogos.nome,jogos.informacaojg,jogos.preco,jogos.imagem])
        return result
    }
    async excluir(codigojg:string){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("DELETE FROM produtos WHERE codigojg = ?",[codigojg])
        return result
    }
    async alterar(codigojg:string,jogos:{codigojg?:string,nome:string,informacaojg:string,imagem:string,preco:string}){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("UPDATE produtos SET nome=?,descricao=?,preco=?,imagem=? WHERE id=?",[jogos.nome,jogos.informacaojg,jogos.preco,jogos.imagem,codigojg])
        return result
    }
    async listarPorId(codigojg:string){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("SELECT * FROM produtos WHERE codigojg = ?",[codigojg]) as RowDataPacket[]
        return result[0]
    }
}

export default BancoMysql