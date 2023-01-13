import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  static async getHomeTeams(req_: Request, res: Response) {
    const leaderBoard = await LeaderboardService.getHomeTeams();
    return res.status(200).json(leaderBoard);
  }

  static async getAwayTeams(req_: Request, res: Response) {
    const leaderBoard = await LeaderboardService.getAwayTeams();
    return res.status(200).json(leaderBoard);
  }

  static async getAll(req_: Request, res: Response) {
    const leaderBoard = await LeaderboardService.getAll();
    return res.status(200).json(leaderBoard);
  }
}

export default LeaderboardController;
