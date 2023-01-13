import Joi = require('joi');
import throwError from '../helpers/throwError';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

class MatchesService {
  static async validateBodyMatch(body: Teams, routeType: string) {
    let schema = Joi.object({}); console.log('TE PEGUEI ', body);
    if (routeType === 'post') {
      schema = Joi.object({
        homeTeam: Joi.number().integer().required(),
        awayTeam: Joi.number().integer().required(),
        homeTeamGoals: Joi.number().integer().required(),
        awayTeamGoals: Joi.number().integer().required(),
        inProgress: Joi.boolean().optional().allow(null),
      });
    }
    if (routeType === 'update') {
      schema = Joi.object({
        homeTeamGoals: Joi.number().integer().required(),
        awayTeamGoals: Joi.number().integer().required(),
      });
    }
    const result = await schema.validateAsync(body);
    return result;
  }

  static async getAll() {
    const matches = await Matches.findAll({
      include: [
        { model: Teams,
          as: 'teamHome',
          attributes: ['teamName'] },
        { model: Teams,
          as: 'teamAway',
          attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  static async getByProgressStatus(inProgress:boolean) {
    const matches = await Matches.findAll({ where: { inProgress },
      include: [
        { model: Teams,
          as: 'teamHome',
          attributes: ['teamName'] },
        { model: Teams,
          as: 'teamAway',
          attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  static async addMatch(match:Matches) {
    console.log('MATCHES', match);
    const { homeTeam, awayTeam } = match;
    if (homeTeam === awayTeam) {
      throwError.unathorized('It is not possible to create a match with two equal teams');
    }
    const homeTeamDB = await Teams.findByPk(homeTeam);
    const awayTeamDB = await Teams.findByPk(awayTeam);
    if (!homeTeamDB || !awayTeamDB) throwError.doesntExist('There is no team with such id!');

    const newMatch = await Matches.create({ ...match, inProgress: true });
    return newMatch;
  }

  static async updateMatch(id: string | number) {
    const [updatedMatch] = await Matches.update({ inProgress: false }, { where: { id } });
    const updateMsg = updatedMatch
      ? { message: 'Finished' } : { message: 'already Finished' };
    return updateMsg;
  }

  static async updateMatchScore(id:number | string, homeTeamGoals:number, awayTeamGoals:number) {
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    const updatedMatch = await Matches.findByPk(id);
    return updatedMatch;
  }
}
export default MatchesService;
