import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import authMiddleware from '../middlewares/validateToken';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get(
  '/',
  (req, res) => matchController.getAllMatches(req, res),
);

matchRouter.post(
  '/',
  authMiddleware,
  (req, res) => matchController.createMatch(req, res),
);
export default matchRouter;
