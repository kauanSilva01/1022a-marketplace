import {MongoClient} from 'mongodb'
class BancoMongo{
    connection:MongoClient|null = null
    async criarConexao(){
        const url = 'mongodb://localhost:27017';
        const client = new MongoClient(url);
        this.connection = await client.connect();
    }
    async finalizarConexao(){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        await this.connection.close()
    }
}

export default BancoMongo