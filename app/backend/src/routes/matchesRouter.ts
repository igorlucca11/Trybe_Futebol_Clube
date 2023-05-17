import * as express from 'express';
import servicesMatches from '../services/Matches';

const matchesRouter = express.Router();

matchesRouter.get('/', servicesMatches.getAll);

export default matchesRouter;
