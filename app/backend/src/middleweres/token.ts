import { SignOptions, sign } from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export default function createToken(name: string): string {
  console.log(secret);
  const token: string = sign(
    { username: name },
    secret,
    jwtConfig,
  );
  return token;
}

// export async function validate(req: Request, res: Response, next: NextFunction) {
//   interface JwtPayload {
//     username: string
//   }
//   const token = req.header('Authorization');
//   if (!token) { next('err'); return; }
//   try {
//     const decoded = verify(token, secret);
//     const { username } = decoded as JwtPayload;
//     const model = new UserModel(connection);
//     const user = await model.getByUsername(username);
//     if (!user) { next('err'); return; }
//     req.body.userId = user.id;
//     next();
//   } catch (err) {
//     next(err);
//   }
// }
