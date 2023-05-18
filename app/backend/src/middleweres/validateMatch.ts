import { NextFunction, Request, Response } from 'express';
import { INVALID_MATCH, TEAM_NOT_FOUND } from '../errors';
import Team from '../database/models/TeamModel';

async function validateMatch(req: Request, _res: Response, next: NextFunction) {
  try {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      throw INVALID_MATCH;
    }
    const homeTeam = await Team.findByPk(homeTeamId);
    const awayTeam = await Team.findByPk(awayTeamId);
    if (!homeTeam || !awayTeam) { throw TEAM_NOT_FOUND; }
    next();
  } catch (err) {
    next(err);
  }
}

export default validateMatch;
