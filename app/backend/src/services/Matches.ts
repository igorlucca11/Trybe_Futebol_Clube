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
    console.log(updatedMatch);
    return res.json(updatedMatch).status(200);
  }
}

export default servicesMatches;
