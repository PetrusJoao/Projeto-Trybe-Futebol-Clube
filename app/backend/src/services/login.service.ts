import UserModel from '../database/models/UserModel';

export default class LoginService {
  static findUser = async (user: string) => {
    const email = user;
    const role = await UserModel.findOne({ where: { email } });
    if (!role) {
      throw new Error('Indefinido');
    }
    return role.role;
  };
}
