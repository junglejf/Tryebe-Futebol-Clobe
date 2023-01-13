import { IUser } from '../interfaces/userInterface';
export const userMock: IUser = {
  username: 'LuisLogin',
  role: 'user',
  email: 'luislogin@email.com',
  password: 'luislogin'
  // username: 'Admin',
  // role: 'admin',
  // email: 'admin@admin.com',
  // password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
};

export const userBodyMock = {
  email: 'luislogin@email.com',
  password: 'luislogin'
}

export const teamsMock: Array<{}> = [{id: 1,team_name: 'Flamengo'},{id: 2,team_name: 'Grêmio'}]

export const tokenMock = 'abc123';

export const matchesMock: Array<{}> = [
  {
    home_team: 3,
    home_team_goals: 2,
    away_team: 11,
    away_team_goals: 0,
    in_progress: false,
  },
  {
    home_team: 12,
    home_team_goals: 4,
    away_team: 8,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 16,
    home_team_goals: 2,
    away_team: 9,
    away_team_goals: 0,
    in_progress: true,
  },
  {
    home_team: 6,
    home_team_goals: 1,
    away_team: 1,
    away_team_goals: 0,
    in_progress: true,
  },
]

export const matchesInProgressMock: Array<{}> = [
  {
    home_team: 16,
    home_team_goals: 2,
    away_team: 9,
    away_team_goals: 0,
    in_progress: true,
  },
  {
    home_team: 6,
    home_team_goals: 1,
    away_team: 1,
    away_team_goals: 0,
    in_progress: true,
  },

]