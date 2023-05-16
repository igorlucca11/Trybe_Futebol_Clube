import * as express from 'express';
import servicesTeams from '../services/Teams';

const teamsRouter = express.Router();

teamsRouter.get('/', servicesTeams.getAllTeams);
teamsRouter.get('/:id', servicesTeams.getTeamsById);

export default teamsRouter;
