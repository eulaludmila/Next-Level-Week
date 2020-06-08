import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import {celebrate, Joi} from 'celebrate'

import PointsController from './controllers/PointsController'
import PointsAllController from './controllers/PointsAllController'
import ItemsController from './controllers/ItemsController';
import PostsController from './controllers/PostsController';

//desacoplar as rotas
const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const pointsAllController = new PointsAllController();
const itemsController = new ItemsController();
const postsController = new PostsController();

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.get('/points-all', pointsAllController.index);
routes.get('/points/:id' ,pointsController.show);

routes.post('/points',upload.single('image'),celebrate({
    body: Joi.object().keys({
      nome: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp:Joi.number().required(),  
      latitude:Joi.number().required(),  
      longitude:Joi.number().required(),  
      city: Joi.string().required(),
      uf:Joi.string().required().max(2),
      items: Joi.string().required(),
    })
},{
    //faz todas as validações ao mesmo tempo
    abortEarly:false,
}), pointsController.create);


routes.post('/posts',upload.single('image'), postsController.create)

export default routes;