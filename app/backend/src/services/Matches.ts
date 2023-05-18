import { NextFunction, Request, Response } from 'express';
import Match from '../database/models/MatchModel';

class servicesMatches {
  static async getAll() {
    const matches = await Match.findAll({
      include: [
        { association: 'homeTeam',
          attributes: ['teamName'] },
        { association: 'awayTeam',
          attributes: ['teamName'] },
      ] });
    return matches;
  }

  static async getByProgress(bool: boolean) {
    const matches = await Match.findAll({
      where: { inProgress: bool },
      include: [
        { association: 'homeTeam',
          attributes: ['teamName'] },
        { association: 'awayTeam',
          attributes: ['teamName'] },
      ] });
    return matches;
  }

  static async finishMatch(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const updatedMatch = await Match.update({
      inProgress: false }, {
      where: { id } });
    console.log(updatedMatch);
    return res.json({ message: 'Finished' }).status(200);
  }

  static async updateMatch(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const updatedMatch = await Match.update({
      homeTeamGoals, awayTeamGoals }, {
      where: { id } });
    return res.json(updatedMatch).status(200);
  }

  static async createMatch(req: Request, res: Response, _next: NextFunction) {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
    const match = await Match.create({ homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true });
    return res.status(201).json(match.dataValues);
  }
}

export default servicesMatches;
