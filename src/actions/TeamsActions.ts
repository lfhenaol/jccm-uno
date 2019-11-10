import { TeamsActionTypes } from '../action-types';

export enum StatusTeam {
  ESTIMING = 'ESTIMING',
  WAITING = 'WAITING',
  WINNER_ITERATION = 'WINNER_ITERATION',
  GLOBAL_WINNER = 'GLOBAL_WINNER'
}

export interface AddToTeamsAction {
  type: typeof TeamsActionTypes.ADD_TO_TEAMS;
  teamName: string;
}

export function addToTeams(teamName: string): AddToTeamsAction {
  return {
    type: TeamsActionTypes.ADD_TO_TEAMS,
    teamName
  };
}
