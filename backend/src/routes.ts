import express from 'express';
import PointController from './controller/PointController';
import ItemController from './controller/ItemController';

const routes  = express.Router();

 const pointController = new PointController();
 const itemController = new ItemController();


routes.get('/', (request, response) => {
  return response.json({message: "Boa Noite Dev"})
     
});

routes.get('/items', itemController.index);
routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);

routes.post('/points', pointController.create);




export default routes;
