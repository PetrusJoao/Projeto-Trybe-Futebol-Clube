import { Router } from 'express';
import TeamController from '../controllers/team.controller';
// import authMiddleware from '../middlewares/validateToken';

const teamRouter = Router();

const teamController = new TeamController();

teamRouter.get(
  '/',
  (req, res) => teamController.getAllTeams(req, res),
);
teamRouter.get(
  '/:id',
  (req, res) => teamController.getTeamById(req, res),
);

export default teamRouter;
