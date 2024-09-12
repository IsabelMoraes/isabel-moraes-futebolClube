import { IUsers, IUserLogin } from '../Interfaces/users/IUsers';
import SequelizeUser from '../database/models/SequelizeUsers';
import { IUserModel } from '../Interfaces/users/IUsersModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: IUserLogin['email']): Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    return user;
  }
}
