//es6 named import for router from express and controller from memo.controller.js file
import {Router} from 'express';
import controller from './memo.controller.js'

//creates new variable 'router' and sets it = Router function from express
const router = Router();

//routes .post and .getall functions to the './api/memo' path
router.route('/')
    .post(controller.post)
    .get(controller.getAll)

//routes the .getById, .put and .del functions to the './api/memo/:id' path
router.route('/:id')
    .get(controller.getById)
    .put(controller.put)
    .delete(controller.del)

//es6 default export router to index.js
export default router;