import { Router } from 'express';
import LeaderboardController from '../controllers/leaderBoardController';

const leaderboardRoute = Router();

leaderboardRoute.get('/home', LeaderboardController.getHomeTeams);
leaderboardRoute.get('/away', LeaderboardController.getAwayTeams);
leaderboardRoute.get('/', LeaderboardController.getAll);

export default leaderboardRoute;
