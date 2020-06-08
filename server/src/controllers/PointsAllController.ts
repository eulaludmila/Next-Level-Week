import {Request, Response} from 'express'
import knex from '../database/connection'

class PointsAllController{
    async index (req:Request, res:Response){

        const {uf, city} = req.query;

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .where('city', String(city))
        .where('uf', String(uf))
        .select('points.*')

        .distinct();
        
        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url:`http://192.168.100.4:3333/uploads/${point.image}`
            }
        })

        return res.json(serializedPoints);
    }

    
}

export default PointsAllController;