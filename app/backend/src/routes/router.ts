import { Router } from 'express';
import loginRouter from './login.router';
import matchRouter from './match.router';
import teamsRouter from './team.router';
import leaderboardRouter from './leaderboard.router';

const router = Router();

router.use('/login', loginRouter);
router.use('/matches', matchRouter);
router.use('/teams', teamsRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
