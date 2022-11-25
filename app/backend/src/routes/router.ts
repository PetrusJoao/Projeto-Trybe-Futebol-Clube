import { Router } from 'express';
import loginRouter from './login.router';
// import productsRouter from './products.router';
// import usersRouter from './users.router';
// import ordersRouter from './orders.router';

// import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.use('/login', loginRouter);
// router.use('/products', productsRouter);
// router.use('/users', usersRouter);
// router.use('/orders', ordersRouter);

export default router;
