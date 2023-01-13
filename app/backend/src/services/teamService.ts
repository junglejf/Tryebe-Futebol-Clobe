import throwError from '../helpers/throwError';
import Team from '../database/models/teams';

class TeamService {
  static async getAll() {
    const teams = await Team.findAll({ raw: true });

    return teams;
  }

  static async getById(id:string) {
    const team = await Team.findOne({ where: { id }, raw: true });

    if (!team) throwError.notFound('There is no team with such id!');

    return team;
  }
}

export default TeamService;
