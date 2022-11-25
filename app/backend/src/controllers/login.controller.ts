import { Request, Response } from 'express';
// import { RequestInterface } from '../interfaces/user.interface';
import UserModel from '../database/models/UserModel';
import createToken from '../helpers/createToken';

export default class LoginController {
  loginRequest = async (req: Request, res: Response) => {
    const login = req.body;

    const token = createToken(login);

    return res.status(200).json({ token });
  };

  static loginValidate = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ where: { email } });

    return res.status(200).json({ role: user?.role });
  };
}
