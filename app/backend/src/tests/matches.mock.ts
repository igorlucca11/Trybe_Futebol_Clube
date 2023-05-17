import { QueryTypes } from "sequelize";

const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

export const matchesDataBase = [
  {
    home_team_id: 16,
    home_team_goals: 1,
    away_team_id: 8,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team_id: 9,
    home_team_goals: 1,
    away_team_id: 14,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team_id: 4,
    home_team_goals: 3,
    away_team_id: 11,
    away_team_goals: 0,
    in_progress: false,
  },
]

const MatchesMock = dbMock.define('users')

MatchesMock.$queryInterface.$useHandler((query: string, queryOptions: QueryTypes) => {
  if(query === 'findAll') {
    return matchesDataBase
  }
})

export default MatchesMock