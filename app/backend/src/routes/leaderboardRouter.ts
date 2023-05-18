import * as express from 'express';
import servicesLeaderboard from '../services/Leaderboard';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/home', servicesLeaderboard.createHomeLeaderboard);

export default leaderboardRouter;
