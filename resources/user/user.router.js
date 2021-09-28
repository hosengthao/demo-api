//es6 named import for router from express and controller from user.controller.js file
import {Router} from 'express';
import controller from './user.controller.js'

//creates new variable 'router' and sets it = Router function from express
const router = Router();

//routes .create function to the './api/user' path
router.route('/create')
    .post(controller.create)

//routes .login function to the './api/user/:id' path
router.route('/login')
    .post(controller.login)

//exports router to index.js
export default router;