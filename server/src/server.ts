import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';

//Precisa de uma definição de tipos: olhar nos "..." do import onde mostra o que instalar

const app = express();

app.use(cors());

//ambiente de desenvolvimento
// app.use(cors({
//     origin:'www'
// }));

app.use(express.json());

app.use(routes);

//express.static(): caminho estático
app.use('/uploads', express.static(path.resolve(__dirname, '..','uploads')));

//Rota: Endereço completo da requisição
//Recurso: Qual entidade estamos acessando no sistema

app.listen(3333);