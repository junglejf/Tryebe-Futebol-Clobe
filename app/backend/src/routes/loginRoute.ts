import { Router } from 'express';
import LoginController from '../controllers/loginController';
import validateToken from '../middlewares/authMiddleware';

const loginRoute = Router();

loginRoute.post('/', LoginController.authLogin);
loginRoute.get('/validate', validateToken, LoginController.validate);
export default loginRoute;
