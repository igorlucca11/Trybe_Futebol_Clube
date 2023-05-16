import { NextFunction, Request, Response } from 'express';
import Teams from '../database/models/TeamsModel';

class servicesTeams {
  static async getAllTeams(_req: Request, res: Response, _next: NextFunction) {
    const teams = await Teams.findAll();
    return res.status(200).json(teams);
  }
}

export default servicesTeams;
