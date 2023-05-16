import { NextFunction, Request, Response } from 'express';
import Teams from '../database/models/TeamsModel';

class servicesTeams {
  static async getAllTeams(_req: Request, res: Response, _next: NextFunction) {
    const teams = await Teams.findAll();
    return res.status(200).json(teams);
  }

  static async getTeamsById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const team = await Teams.findByPk(id);
    return res.status(200).json(team);
  }
}

export default servicesTeams;
