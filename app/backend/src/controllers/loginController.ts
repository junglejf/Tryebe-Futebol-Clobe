import { Request, Response } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  static async authLogin(req: Request, res: Response) {
    // console.log('REQ.BODY: ', req.body);
    const userInfo = await LoginService.validateBodyLogin(req.body);
    const user = await LoginService.validateUser(userInfo);
    console.log('USER: ', user);
    const token = await LoginService.loginToken(user);
    console.log('Token: ', token);
    res.status(200).json({ token });
  }

  static async validate(req: Request, res: Response) {
    const { role } = req.body.user;
    res.status(200).json({ role });
  }
}

export default LoginController;
