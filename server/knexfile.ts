import path from 'path';

//Esse arquivo não pode usar export default
module.exports = {
    client:'sqlite3',
    connection: {
       
        filename: path.resolve(__dirname, 'src','database','database.sqlite'), 
    },
    migrations: {
        //diretorio onde ficará as migrations
        directory: path.resolve(__dirname, 'src', 'database','migrations'),
    },
    seeds: {
        //diretorio onde ficará as migrations
        directory: path.resolve(__dirname, 'src', 'database','seeds'),
    },
    //Aceitar null na criação
    useNullAsDefault:true,
}