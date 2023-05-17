import Match from '../database/models/MatchModel';

class servicesMatches {
  static async getAll() {
    const matches = await Match.findAll({
      include: [
        { association: 'homeTeam',
          attributes: ['teamName'] },
        { association: 'awayTeam',
          attributes: ['teamName'] },
      ] });
    return matches;
  }

  static async getByProgress(bool: boolean) {
    const matches = await Match.findAll({
      where: { inProgress: bool },
      include: [
        { association: 'homeTeam',
          attributes: ['teamName'] },
        { association: 'awayTeam',
          attributes: ['teamName'] },
      ] });
    return matches;
  }
}

export default servicesMatches;
