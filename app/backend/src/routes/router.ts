import { Router } from 'express';
import loginRouter from './login.router';
import matchRouter from './match.router';
import teamsRouter from './team.router';

const router = Router();

router.use('/login', loginRouter);
router.use('/matches', matchRouter);
router.use('/teams', teamsRouter);
// router.use('/orders', ordersRouter);

export default router;
