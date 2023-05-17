import { NextFunction, Request, Response } from 'express';
import testEmail from '../middleweres/emailTest';
import createToken from '../middleweres/token';
import { ALL_FIELDS_MUST_BE_FILLED, INVALID_EMAIL_OR_PASSWORD } from '../errors';
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
      if (!email || !password) { throw ALL_FIELDS_MUST_BE_FILLED; }
      const user = await servicesUsers.getUser(email);
      const isEmailValid = testEmail(email);
      if (!isEmailValid || password.length < 6) { throw INVALID_EMAIL_OR_PASSWORD; }
      if (user === null) { throw INVALID_EMAIL_OR_PASSWORD; }
      const isPassValid = await passwordValidation(password, user.password);
      if (!isPassValid) { throw INVALID_EMAIL_OR_PASSWORD; }
      req.body.username = user.username;
      next();
    } catch (err) {
      next(err);
    }
  }

  static async logIn(req: Request, res: Response, _next: NextFunction) {
    const { username } = req.body;
    const token = await createToken(username);
    return res.json({ token }).status(200);
  }
}

export default servicesUsers;
