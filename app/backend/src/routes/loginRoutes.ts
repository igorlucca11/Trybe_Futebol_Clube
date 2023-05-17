import * as express from 'express';
import servicesUsers from '../services/Users';

const loginRouter = express.Router();

loginRouter.post('/', servicesUsers.validateUser, servicesUsers.logIn);

export default loginRouter;
