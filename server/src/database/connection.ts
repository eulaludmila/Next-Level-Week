import knex from 'knex';
import path from 'path' 

const connection = knex({
    client:'sqlite3',
    connection: {
        //__dirname: vai retornar o caminho do diretorio database, onde está o arquivo connection.ts
        filename: path.resolve(__dirname, 'database.sqlite'), //uni caminhos, vai pegar o index.js da pasta database
        //database.sqlite: vai criar um arquivo com esse nome
        
    },
    //Aceitar null na criação
    useNullAsDefault:true,
})


export default connection;

// Migrations: Histórico do banco de Dados