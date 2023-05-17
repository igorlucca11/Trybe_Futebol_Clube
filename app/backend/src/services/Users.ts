import { NextFunction, Request, Response } from 'express';
import createToken from '../middleweres/token';
import { ALL_FIELDS_MUST_BE_FILLED } from '../errors';
import passwordValidation from '../middleweres/passwordValidation';
import User from '../database/models/UserModel';

class servicesUsers {
  static async getUser(email: string) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  static async validateUser(req: Request, _res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw new Error();
      }
      const user = await servicesUsers.getUser(email);
      if (user === null) {
        throw new Error();
      }
      const isPassValid = passwordValidation(password, user.password);
      if (!isPassValid) {
        throw new Error();
      }
      req.body.username = user.username;
      next();
    } catch (err) {
      next(ALL_FIELDS_MUST_BE_FILLED);
    }
  }

  static async logIn(req: Request, res: Response, _next: NextFunction) {
    const { username } = req.body;
    const token = await createToken(username);
    return res.json({ token }).status(200);
  }
}

export default servicesUsers;
