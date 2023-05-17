import * as express from 'express';
import servicesUsers from '../services/Users';
import { validateToken } from '../middleweres/token';

const loginRouter = express.Router();

loginRouter.post('/', servicesUsers.validateUser, servicesUsers.logIn);
loginRouter.get('/role', validateToken, servicesUsers.getRole);

export default loginRouter;
