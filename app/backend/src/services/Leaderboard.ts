import { Request, Response } from 'express';
import efficiencyCalculator, { Status } from '../middleweres/eficiencyCalculator';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

export interface team {
  homeMatch: [{ homeTeamGoals: number, awayTeamGoals: number, inProgress: boolean }],
  awayMatch: [{ homeTeamGoals: number, awayTeamGoals: number, inProgress: boolean }],
  teamName: string,
  id: number,
}

class servicesLeaderboard {
  static async getTeamsWithMatch() {
    const teams = await Team.findAll({ include:
       [{ model: Match, as: 'homeMatch' }, { model: Match, as: 'awayMatch' }] });
    return teams;
  }

  static initialStatus() {
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

  static orderLeaderboard(board: Array<Status>) {
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

  static joinBoards(home: Status, away: Status) {
    const fullStatus = servicesLeaderboard.initialStatus();
    fullStatus.name = home.name;
    fullStatus.goalsFavor = home.goalsFavor + away.goalsFavor;
    fullStatus.goalsOwn = home.goalsOwn + away.goalsOwn;
    fullStatus.totalDraws = home.totalDraws + away.totalDraws;
    fullStatus.totalLosses = home.totalLosses + away.totalLosses;
    fullStatus.totalVictories = home.totalVictories + away.totalVictories;
    fullStatus.totalGames = home.totalGames + away.totalGames;
    fullStatus.totalPoints = home.totalPoints + away.totalPoints;
    fullStatus.goalsBalance = fullStatus.goalsFavor - fullStatus.goalsOwn;
    fullStatus.efficiency = efficiencyCalculator(fullStatus);
    return fullStatus;
  }

  static calculateHomestatus(team: team) {
    const homeStatus = servicesLeaderboard.initialStatus();
    homeStatus.name = team.teamName;
    team.homeMatch.forEach((match) => {
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
    return homeStatus;
  }

  static calculateAwayStatus(team: team) {
    const awayStatus = servicesLeaderboard.initialStatus();
    awayStatus.name = team.teamName;
    team.awayMatch.forEach((match) => {
      if (match.inProgress === false) {
        awayStatus.totalGames += 1; awayStatus.goalsFavor += match.awayTeamGoals;
        awayStatus.goalsOwn += match.homeTeamGoals;
        if (match.homeTeamGoals < match.awayTeamGoals) {
          awayStatus.totalVictories += 1; awayStatus.totalPoints += 3;
        } else if (match.homeTeamGoals === match.awayTeamGoals) {
          awayStatus.totalDraws += 1; awayStatus.totalPoints += 1;
        } else if (match.homeTeamGoals > match.awayTeamGoals) { awayStatus.totalLosses += 1; }
      }
    });
    return awayStatus;
  }

  static calculateHomeBoard(t: Team[]) {
    const board = t.map(({ dataValues }) => {
      const homeStatus = servicesLeaderboard.calculateHomestatus(dataValues);
      homeStatus.efficiency = efficiencyCalculator(homeStatus);
      homeStatus.goalsBalance = homeStatus.goalsFavor - homeStatus.goalsOwn;
      return { ...homeStatus };
    }); return board;
  }

  static calculateAwayBoard(t: Team[]) {
    const board = t.map(({ dataValues }) => {
      const awayStatus = servicesLeaderboard.calculateAwayStatus(dataValues);
      awayStatus.efficiency = efficiencyCalculator(awayStatus);
      awayStatus.goalsBalance = awayStatus.goalsFavor - awayStatus.goalsOwn;
      return { ...awayStatus };
    }); return board;
  }

  static calculateFullBoard(t: Team[]) {
    const board = t.map(({ dataValues }) => {
      const homeStatus = servicesLeaderboard.calculateHomestatus(dataValues);
      const awayStatus = servicesLeaderboard.calculateAwayStatus(dataValues);
      const fullStatus = servicesLeaderboard.joinBoards(homeStatus, awayStatus);
      return { ...fullStatus };
    }); return board;
  }

  static async createLeaderboard(option: string) {
    const teams = await servicesLeaderboard.getTeamsWithMatch();
    let board: Status[];
    if (option === '/home') {
      board = servicesLeaderboard.calculateHomeBoard(teams);
    } else if (option === '/away') {
      board = servicesLeaderboard.calculateAwayBoard(teams);
    } else {
      board = servicesLeaderboard.calculateFullBoard(teams);
    }
    return board;
  }

  static async getLeaderboard(req: Request, res: Response) {
    const leaderboard = req.path;
    let board: Status[];
    if (leaderboard === '/home' || leaderboard === '/away') {
      board = await servicesLeaderboard.createLeaderboard(leaderboard);
    } else {
      board = await servicesLeaderboard.createLeaderboard('fullTable');
    }
    board = servicesLeaderboard.orderLeaderboard(board);
    return res.json(board);
  }
}

export default servicesLeaderboard;
