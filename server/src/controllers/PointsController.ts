import {Request, Response} from 'express'
import knex from '../database/connection';

class PointsController{

    //listar
    async index(req:Request, res:Response){

        const { city ,uf , items} = req.query;
        
        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));
      
        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');
        
        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.100.4:3333/uploads/${point.image}`,
            }
        })
    
        return res.json(serializedPoints);
        

    }

    //mostrar apenas um registro específico
    async show(req:Request, res:Response){

        const {id} = req.params;

        const point = await knex('points').where('id', id).first();
        if(!point){
            return res.status(400).json({message:'Point not found.'});
        }
        const serializedPoint = {
      
                ...point,
                image_url: `http://192.168.100.4:3333/uploads/${point.image}`,
       
        }
        
        const items = await knex('items')
        .join('point_items','items.id', '=' , 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('title');


        return res.json({
            point:serializedPoint, items
        });
    }

    //criar
    async create(req:Request, res:Response){
        const {
            nome,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body;

        // console.log(req);
    
        //trx(transation)usada para caso der erro em alguma requisição, não insira nada
        const trx = await knex.transaction();

        const point = {
            image:req.file.filename,
            nome,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }

            const insertedIds = await trx('points').insert(point);
    
   
        const point_id = insertedIds[0];
    
        const pointItems = items
        .split(',')
        .map((item:string) => Number(item.trim()))
        .map((item_id: number) => {
            return {
                item_id,
                point_id,
            }
        })
    
        //cadastro do relacionamento de ponto com itens
        await trx('point_items').insert(pointItems);

        //se der certo as requisições, a operação será realizada
        await trx.commit();
    
        return res.json({
            id:point_id,
            ...point,
        });
    }
}

export default PointsController;