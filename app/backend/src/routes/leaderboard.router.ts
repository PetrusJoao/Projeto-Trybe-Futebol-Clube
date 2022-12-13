import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
// import authMiddleware from '../middlewares/validateToken';

const leaderboardRouter = Router();

const leaderboardController = new LeaderboardController();

leaderboardRouter.get(
  '/home',
  (req, res) => leaderboardController.getLeaderboardHome(req, res),
);

export default leaderboardRouter;
