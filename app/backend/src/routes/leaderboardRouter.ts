import * as express from 'express';
import servicesLeaderboard from '../services/Leaderboard';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/', servicesLeaderboard.getLeaderboard);
leaderboardRouter.get('/home', servicesLeaderboard.getLeaderboard);
leaderboardRouter.get('/away', servicesLeaderboard.getLeaderboard);

export default leaderboardRouter;
