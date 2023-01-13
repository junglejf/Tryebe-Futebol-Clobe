import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import validateToken from '../middlewares/authMiddleware';

const matchesRoute = Router();

matchesRoute.get('/', MatchesController.getAll);
matchesRoute.post('/', validateToken, MatchesController.addMatch);
matchesRoute.patch('/:id/finish', MatchesController.updateMatch);
matchesRoute.patch('/:id', MatchesController.updateMatchScore);
export default matchesRoute;
