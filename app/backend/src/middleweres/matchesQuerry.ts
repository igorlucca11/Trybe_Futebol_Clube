import { NextFunction, Request, Response } from 'express';
import { INVALID_QUERY } from '../errors';
import servicesMatches from '../services/Matches';

async function getMatches(req: Request, res: Response, next: NextFunction) {
  const { inProgress } = req.query;
  if (inProgress === undefined) {
    const matches = await servicesMatches.getAll();
    return res.status(200).json(matches);
  }
  if (inProgress === 'true') {
    const matches = await servicesMatches.getByProgress(true);
    return res.status(200).json(matches);
  }
  if (inProgress === 'false') {
    const matches = await servicesMatches.getByProgress(false);
    return res.status(200).json(matches);
  }
  next(INVALID_QUERY);
}

export default getMatches;
