import { Leaderboard } from '../interfaces/leaderboardInterface';
import MatchesModel from '../database/models/matches';

export async function gamesWinLossDraw(teamId:number, games:MatchesModel[], homeOrAway:string) {
  let win = games.length; let draw = 0;
  games.forEach((game) => {
    const { homeTeamGoals, awayTeamGoals, homeTeam, awayTeam } = game;
    if ((homeOrAway === 'home' || 'all') && homeTeamGoals < awayTeamGoals
    && homeTeam === teamId) win -= 1;
    if ((homeOrAway === 'away' || 'all') && homeTeamGoals > awayTeamGoals
    && awayTeam === teamId) win -= 1;
    if (homeTeamGoals === awayTeamGoals) { draw += 1; win -= 1; }
  }); return { totalPoints: (win * 3) + draw,
    totalGames: games.length,
    totalVictories: win,
    totalDraws: draw,
    totalLosses: games.length - win - draw,
    efficiency: ((((win * 3) + draw) / (games.length * 3)) * 100).toFixed(2),
  };
}

export async function goals(teamId:number, games:MatchesModel[]) {
  let doneGoals = 0;
  let takenGoals = 0;
  games.forEach((game) => {
    const { homeTeamGoals, awayTeamGoals, homeTeam } = game;
    if (homeTeam === teamId) {
      doneGoals += homeTeamGoals;
      takenGoals += awayTeamGoals;
    } else {
      doneGoals += awayTeamGoals;
      takenGoals += homeTeamGoals;
    }
  });

  return {
    goalsFavor: doneGoals,
    goalsOwn: takenGoals,
    goalsBalance: doneGoals - takenGoals,
  };
}
export async function sortTable(leaderboard: Leaderboard[]): Promise<Leaderboard[]> {
  const sortedTable = leaderboard
    .sort((teamA, teamB) => teamB.totalPoints - teamA.totalPoints
    || teamB.totalVictories - teamA.totalVictories || teamB.goalsBalance - teamA.goalsBalance
    || teamB.goalsFavor - teamA.goalsFavor || teamB.goalsOwn - teamA.goalsOwn);

  return sortedTable;
}
