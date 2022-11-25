import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import { emailValidation, passwordValidation } from '../middlewares/login.validation';
import authMiddleware from '../middlewares/validateToken';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post(
  '/',
  emailValidation,
  passwordValidation,
  (req, res) => loginController.loginRequest(req, res),
);
loginRouter.get(
  '/validate',
  authMiddleware,
  emailValidation,
  passwordValidation,
  (req, res) => LoginController.loginValidate(req, res),
);

export default loginRouter;
