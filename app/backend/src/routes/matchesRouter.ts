import * as express from 'express';
import getMatches from '../middleweres/matchesQuerry';
import { validateToken } from '../middleweres/token';
import servicesMatches from '../services/Matches';

const matchesRouter = express.Router();

matchesRouter.get('/', getMatches);
matchesRouter.patch('/:id/finish', validateToken, servicesMatches.finishMatch);
matchesRouter.patch('/:id', validateToken, servicesMatches.updateMatch);

export default matchesRouter;
