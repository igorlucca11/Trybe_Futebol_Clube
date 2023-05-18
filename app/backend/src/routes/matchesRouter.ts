import * as express from 'express';
import getMatches from '../middleweres/matchesQuerry';
import { validateToken } from '../middleweres/token';
import servicesMatches from '../services/Matches';
import validateMatch from '../middleweres/validateMatch';

const matchesRouter = express.Router();

matchesRouter.get('/', getMatches);
matchesRouter.post('/', validateToken, validateMatch, servicesMatches.createMatch);
matchesRouter.patch('/:id/finish', validateToken, servicesMatches.finishMatch);
matchesRouter.patch('/:id', validateToken, servicesMatches.updateMatch);

export default matchesRouter;
