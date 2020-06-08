import knex from '../database/connection'
import {Request, Response} from 'express';

class PostController{
    async create(req:Request, res:Response){
        const {name, text_post, uf, city,point_id} = req.body;

        const post = {
            name,
            text_post,
            uf,
            city,
            image:req.file.filename,
            point_id:Number(point_id)
        }

        const insertPost = await knex('posts').insert(post);
        
        return res.json({
            id:insertPost[0],
            ...post
        })

    }
}

export default PostController;