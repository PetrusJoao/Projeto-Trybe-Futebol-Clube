import { Request, Response } from 'express';
import MatchService from '../services/match.services';

export default class MatchController {
  getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const matchesInProgress = await MatchService.findMatchesInProgress();
      return res.status(200).json(matchesInProgress);
    } if (inProgress === 'false') {
      const finishedMatches = await MatchService.findFinishedMatches();
      return res.status(200).json(finishedMatches);
    }

    const matches = await MatchService.findAllMatches();

    return res.status(200).json(matches);
  };

  createMatch = async (req: Request, res: Response) => {
    const match = req.body;
    // const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    // console.log(match);

    const matchCreated = await MatchService.createMatch(match);

    return res.status(201).json(matchCreated);
  };
}
