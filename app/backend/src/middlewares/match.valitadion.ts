import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/team.service';

const matchValidation = async (req: Request, res: Response, next: NextFunction) => {
  const match = req.body;
  console.log(match);

  const { homeTeam, awayTeam } = match;
  const verifyHomeTeam = await TeamService.findTeamById(homeTeam);
  const verifyAwayTeam = await TeamService.findTeamById(awayTeam);

  if (!verifyHomeTeam || !verifyAwayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  if (homeTeam === awayTeam) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
};
export default matchValidation;
