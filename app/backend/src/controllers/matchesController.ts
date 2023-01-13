import { Request, Response } from 'express';
import TeamService from '../services/teamService';
// import { verify } from 'jsonwebtoken';
import MatchesService from '../services/matchesService';

class MatchesController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    switch (inProgress) {
      case 'true': {
        const unfinishedMatches = await MatchesService.getByProgressStatus(true);
        return res.status(200).json(unfinishedMatches);
      }
      case 'false': {
        const finishedMatches = await MatchesService.getByProgressStatus(false);
        return res.status(200).json(finishedMatches);
      }
      default: {
        const matches = await MatchesService.getAll();
        return res.status(200).json(matches);
      }
    }
  }

  static async addMatch(req: Request, res: Response) {
    console.log('entrou addMatch', req.body);
    const matchInfo = await MatchesService.validateBodyMatch(req.body, 'post');
    await TeamService.getById(matchInfo.homeTeam);
    await TeamService.getById(matchInfo.awayTeam);
    const match = await MatchesService.addMatch(matchInfo);
    return res.status(201).json(match);
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const finishedMatch = await MatchesService.updateMatch(id);
    res.status(200).json(finishedMatch);
  }

  static async updateMatchScore(req:Request, res:Response) {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;
    const updateScore = await MatchesService.updateMatchScore(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json(updateScore);
  }
}
export default MatchesController;
