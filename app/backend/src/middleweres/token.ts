import { NextFunction, Request, Response } from 'express';
import { SignOptions, sign, verify } from 'jsonwebtoken';
import User from '../database/models/UserModel';
import { TOKEN_NOT_FOUND, INVALID_TOKEN } from '../errors';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export default function createToken(username: string, email: string): string {
  const token: string = sign(
    { username,
      email },
    secret,
    jwtConfig,
  );
  return token;
}

export async function validateToken(req: Request, _res: Response, next: NextFunction) {
  interface JwtPayload {
    username: string,
    email: string,
  }
  const token = req.header('Authorization');
  if (!token) { next(TOKEN_NOT_FOUND); return; }
  try {
    const decoded = verify(token, secret);
    const { username, email } = decoded as JwtPayload;
    const user = await User.findOne({ where: { email } });
    if (!user) { throw INVALID_TOKEN; }
    if (user.email === email && user.username === username) {
      req.body.user = user;
      next();
    } else { throw INVALID_TOKEN; }
  } catch (err) { next(INVALID_TOKEN); }
}
