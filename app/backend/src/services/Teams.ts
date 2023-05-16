import { NextFunction, Request, Response } from 'express';
import Team from '../database/models/TeamModel';

class servicesTeams {
  static async getAllTeams(_req: Request, res: Response, _next: NextFunction) {
    const teams = await Team.findAll();
    return res.status(200).json(teams);
  }

  static async getTeamsById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const team = await Team.findByPk(id);
    return res.status(200).json(team);
  }
}

export default servicesTeams;
