import { Request, Response } from 'express';
// import MatchService from '../services/match.services';
import LeaderboardService from '../services/leaderboard.services';

export default class LeaderboardController {
  getLeaderboardHome = async (req: Request, res: Response) => {
    const matches = await LeaderboardService.getLeaderboard();

    return res.status(200).json(matches);
  };
}

//     const { inProgress } = req.query;
//
//     if (inProgress === 'true') {
//       const matchesInProgress = await MatchService.findMatchesInProgress();
//       return res.status(200).json(matchesInProgress);
//     } if (inProgress === 'false') {
//       const finishedMatches = await MatchService.findFinishedMatches();
//       return res.status(200).json(finishedMatches);
//     }
