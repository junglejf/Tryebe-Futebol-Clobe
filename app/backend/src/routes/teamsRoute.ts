import { Router } from 'express';
import TeamController from '../controllers/teamController';

const teamsRoute = Router();

teamsRoute.get('/', TeamController.getAll);
teamsRoute.get('/:id', TeamController.getById);

export default teamsRoute;
