import * as express from 'express';
import getMatches from '../middleweres/matchesQuerry';

const matchesRouter = express.Router();

matchesRouter.get('/', getMatches);

export default matchesRouter;
