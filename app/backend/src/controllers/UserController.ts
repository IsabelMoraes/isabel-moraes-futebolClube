import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapsStatusHTTP';
import UserService from '../services/UserServices';

class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const ServiceResponse = await this.userService.login({ email, password });
    if (ServiceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
    }
    res.status(200).json(ServiceResponse.data);
  }

  static getUserRole(req: Request, res: Response) {
    try {
      const { role } = req.body.user;
      return res.status(200).json({ role });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default UserController;
