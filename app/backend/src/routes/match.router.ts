import { Router } from 'express';
import MatchController from '../controllers/match.controller';
// import authMiddleware from '../middlewares/validateToken';

const matchRouter = Router();

const matchController = new MatchController();

// matchRouter.post(
//   '/',
//   emailValidation,
//   passwordValidation,
//   (req, res) => loginController.loginRequest(req, res),
// );
matchRouter.get(
  '/',
  (req, res) => matchController.getAllMatches(req, res),
);

export default matchRouter;
