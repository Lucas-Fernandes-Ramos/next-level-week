import {Request, Response} from 'express';

import knex from '../database/connection';

class PointController {
    async index(request: Request, response: Response){
        const { city, uf, items } = request.query;
        console.log(city, uf, items);
        const parsedItems = String(items).split(',').map(item => Number(item.trim()))
      
        const points = await knex('points')
         .join('point_items',  'points.id', '=',  'point_items.point_id') 
         .whereIn('point_items.item_id', parsedItems)
         .where('city', String(city))
         .where('uf', String(uf))
         .distinct()
         .select('points.*')

       return response.json(points)

    }
    async create(request: Request, response: Response){
        const   {
          name, email, wahtsapp, latitude, longitude, city, uf, items
       
        } = request.body;
        
         const transaction = await knex.transaction();
       
         const point  = {
             
           image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
           name, email, 
           wahtsapp, latitude, longitude, city, uf
       
         }
         const ids = await transaction('points').insert(point);
         
         const point_id = ids[0];
         const pointItems = items.map((item_id: number)=>{
          return {
             item_id,
             point_id
          }
            
         })
         console.log("dados a serem salvos no banco = ", pointItems)
         await transaction('point_items').insert(pointItems);
        
        await transaction.commit();
        console.log("Dados salvos com sucesso")
         return response.json({id: point_id, ...point  })
       
       
       }//fim do metodo create

    async show(request:Request, response:Response){
        const {id} =  request.params;
        const point = await knex('points').where('id', id).first();
        console.log('id = ', id)
        if(!point){
            return response.status(400).json({message: "Point not found"})
        }

        const items = await knex('items')
             .join('point_items', 'items.id', '=', 'point_items.item_id')
             .where('point_items.point_id', id);
     return response.json({point, items}) 
    }   
}








export default PointController;