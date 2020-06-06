import multer from 'multer';
//configurações da biblioteca para fazer uploads de imagens

import path from 'path';
import crypto from 'crypto'; //gerar uma hash aleatória

export default {
    storage: multer.diskStorage({
        //para onde vão os arquivos que forem enviados pelo usuários
        destination: path.resolve(__dirname, '..', '..','uploads'),
        filename: (request, file, callback) => {
            const hash = crypto.randomBytes(6).toString('hex');

            //colocando um nome novo no arquivo
            const fileName = `${hash}-${file.originalname}`;

            //o callback é chamado depois que é realizado as linhas acima
            callback(null, fileName);
        }
    })
}