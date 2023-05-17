import { Request, Response } from 'express';
import Match from '../database/models/MatchModel';

class servicesMatches {
  static async getAll(_req: Request, res: Response) {
    const matches = await Match.findAll({ include: [
      { association: 'homeTeam',
        attributes: ['teamName'] },
      { association: 'awayTeam',
        attributes: ['teamName'] },
    ] });
    return res.status(200).json(matches);
  }
}

export default servicesMatches;
