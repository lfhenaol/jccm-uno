import { ResultsActionTypes } from '../action-types';

export interface IterationWinnerTeam {
  team: string;
  score: number;
  iteration: string;
}

export interface GlobalWinnerTeam {
  team: string;
  score: number;
}

export interface AddIterationWinnerTeamAction {
  type: typeof ResultsActionTypes.ADD_ITERATION_WINNER_TEAM;
  winner: IterationWinnerTeam;
}

export interface AddGlobalWinnerTeamAction {
  type: typeof ResultsActionTypes.ADD_GLOBAL_WINNER_TEAM;
  globalWinner: GlobalWinnerTeam;
}

export function addIterationWinnerTeam(winner: IterationWinnerTeam) {
  return {
    type: ResultsActionTypes.ADD_ITERATION_WINNER_TEAM,
    winner
  };
}

export function addGlobalWinnerTeam(globalWinner: GlobalWinnerTeam) {
  return {
    type: ResultsActionTypes.ADD_GLOBAL_WINNER_TEAM,
    globalWinner
  };
}
