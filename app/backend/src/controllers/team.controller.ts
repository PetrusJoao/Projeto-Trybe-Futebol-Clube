import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  getAllTeams = async (req: Request, res: Response) => {
    const teams = await TeamService.findAllTeams();

    return res.status(200).json(teams);
  };

  getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await TeamService.findTeamById(id);

    return res.status(200).json(team);
  };
}
