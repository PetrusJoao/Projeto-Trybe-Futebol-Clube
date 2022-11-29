import { Router } from 'express';
import loginRouter from './login.router';
import matchRouter from './match.router';

const router = Router();

router.use('/login', loginRouter);
router.use('/matches', matchRouter);
// router.use('/users', usersRouter);
// router.use('/orders', ordersRouter);

export default router;
