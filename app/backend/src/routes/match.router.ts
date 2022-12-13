import { Router } from 'express';
import matchValidation from '../middlewares/match.valitadion';
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
  matchValidation,
  (req, res) => matchController.createMatch(req, res),
);

matchRouter.patch(
  '/:id/finish',
  (req, res) => matchController.finishMatch(req, res),
);

matchRouter.patch(
  '/:id',
  (req, res) => MatchController.updateStatus(req, res),
);

export default matchRouter;
