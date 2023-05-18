export interface Status {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

function efficiencyCalculator(status: Status) {
  const { totalGames, totalPoints } = status;
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  return efficiency;
}

export default efficiencyCalculator;
