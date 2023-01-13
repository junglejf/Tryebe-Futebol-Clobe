import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import { gamesWinLossDraw, goals, sortTable } from '../helpers/boardHelper';

const HOME_TEAM = 'homeTeam';
const AWAY_TEAM = 'awayTeam';
const rowFormat = { name: 'x',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

class LeaderboardService {
  static async getHomeTeams() {
    const teams = await Teams.findAll({ raw: true });
    const table = Promise.all(teams.map(async (team) => {
      const matches = await Matches.findAll({
        where: { [HOME_TEAM]: team.id, inProgress: false }, raw: true });
      const updateRowGames = await gamesWinLossDraw(team.id, matches, 'home');
      const updateRowGoals = await goals(team.id, matches);

      const teamRow = { name: team.teamName, ...updateRowGames, ...updateRowGoals };
      return { ...rowFormat, ...teamRow };
    }));
    const response = await table;
    return (sortTable(response));
  }

  static async getAwayTeams() {
    const teams = await Teams.findAll({ raw: true });
    const table = Promise.all(teams.map(async (team) => {
      const matches = await Matches.findAll({
        where: { [AWAY_TEAM]: team.id, inProgress: false }, raw: true });
      const updateRowGames = await gamesWinLossDraw(team.id, matches, 'away');
      const updateRowGoals = await goals(team.id, matches);

      const teamRow = { name: team.teamName, ...updateRowGames, ...updateRowGoals };
      return { ...rowFormat, ...teamRow };
    }));
    const response = await table;
    return (sortTable(response));
  }

  static async getAll() {
    const teams = await Teams.findAll({ raw: true });
    const table = Promise.all(teams.map(async (team) => {
      const matches = await Matches.findAll({
        where: { inProgress: false }, raw: true });
      const updateRowGames = await gamesWinLossDraw(team.id, matches, 'all');
      const updateRowGoals = await goals(team.id, matches);

      const teamRow = { name: team.teamName, ...updateRowGames, ...updateRowGoals };
      return { ...rowFormat, ...teamRow };
    }));
    const response = await table;
    return (sortTable(response));
  }
}

export default LeaderboardService;
