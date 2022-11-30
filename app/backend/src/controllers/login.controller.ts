import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import createToken from '../helpers/createToken';

export default class LoginController {
  loginRequest = async (req: Request, res: Response) => {
    const login = req.body;

    const token = createToken(login);

    return res.status(200).json({ token });
  };

  static loginValidate = async (req: Request, res: Response) => {
    const { user } = req.body;
    const { data } = user;
    const role = await LoginService.findUser(data.username);

    return res.status(200).json({ role });
  };
}
