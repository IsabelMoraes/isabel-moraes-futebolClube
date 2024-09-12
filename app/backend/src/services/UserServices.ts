import bcrypt = require ('bcryptjs');
import { IUserLogin } from '../Interfaces/users/IUsers';
import { IUserModel } from '../Interfaces/users/IUsersModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../models/UserModel';
import createToken from '../auth/token';

export default class loginService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async login({ email, password }: IUserLogin):
  Promise<ServiceResponse<{ token: string }>> {
    const user = await this.userModel.findByEmail(email);

    if (!user) {
      console.log('invalid user');
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = createToken(user);

    return {
      status: 'SUCCESSFUL',
      data: { token },
    };
  }
}
