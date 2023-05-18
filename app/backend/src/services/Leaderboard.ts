import { Request, Response } from 'express';
import efficiencyCalculator from '../middleweres/eficiencyCalculator';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

export interface team {
  homeMatch: [{ homeTeamGoals: number, awayTeamGoals: number, inProgress: boolean }],
  awayMatch: [{ homeTeamGoals: number, awayTeamGoals: number }],
  teamName: string,
  id: number,
}

export interface status{
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

class servicesLeaderboard {
  static async getTeamsWithMatch() {
    const teams = await Team.findAll({ include:
       [{ model: Match, as: 'homeMatch' }, { model: Match, as: 'awayMatch' }] });
    return teams;
  }

  static initialStaus() {
    const inicialStatus = {
      name: 'default',
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
    return inicialStatus;
  }

  static orderLeaderboard(board: Array<status>) {
    board.sort((a, b) => {
      const points = b.totalPoints - a.totalPoints;
      if (points !== 0) { return points; }
      const victories = b.totalVictories - a.totalVictories;
      if (victories !== 0) { return victories; }
      const goalsBalance = b.goalsBalance - a.goalsBalance;
      if (goalsBalance !== 0) { return goalsBalance; }
      const gols = b.goalsFavor - a.goalsFavor;
      return gols;
    });
    return board;
  }

  static calculateHomeBoard(t: team) {
    const homeStatus = servicesLeaderboard.initialStaus();
    homeStatus.name = t.teamName;
    t.homeMatch.forEach((match) => {
      if (match.inProgress === false) {
        homeStatus.totalGames += 1; homeStatus.goalsFavor += match.homeTeamGoals;
        homeStatus.goalsOwn += match.awayTeamGoals;
        if (match.homeTeamGoals > match.awayTeamGoals) {
          homeStatus.totalVictories += 1; homeStatus.totalPoints += 3;
        } else if (match.homeTeamGoals === match.awayTeamGoals) {
          homeStatus.totalDraws += 1; homeStatus.totalPoints += 1;
        } else if (match.homeTeamGoals < match.awayTeamGoals) { homeStatus.totalLosses += 1; }
      }
    });
    homeStatus.efficiency = efficiencyCalculator(homeStatus);
    homeStatus.goalsBalance = homeStatus.goalsFavor - homeStatus.goalsOwn;
    return homeStatus;
  }

  static async createHomeLeaderboard(_req: Request, res: Response) {
    const teams = await servicesLeaderboard.getTeamsWithMatch();
    console.log(teams);
    const homeboard = teams
      .map(({ dataValues }) => {
        const a = servicesLeaderboard.calculateHomeBoard(dataValues);
        return { ...a };
      });
    const board = servicesLeaderboard.orderLeaderboard(homeboard);
    return res.json(board);
  }
}

export default servicesLeaderboard;
