import { TeamActionTypes } from '../action-types/TeamActionTypes';
import { StatusTeam } from './TeamsActions';

export interface ChangeStatusAction {
  type: typeof TeamActionTypes.CHANGE_STATUS;
  status: StatusTeam;
  teamId: string;
}

export interface SkipTurnAction {
  type: typeof TeamActionTypes.SKIP_TURN;
  teamId: string;
}

export interface NoSkipTurnAction {
  type: typeof TeamActionTypes.NO_SKIP_TURN;
  teamId: string;
}

export function changeStatus(
  status: StatusTeam,
  teamId: string
): ChangeStatusAction {
  return {
    type: TeamActionTypes.CHANGE_STATUS,
    teamId,
    status
  };
}

export function skipTurn(teamId: string): SkipTurnAction {
  return {
    type: TeamActionTypes.SKIP_TURN,
    teamId
  };
}

export function noSkipTurn(teamId: string): NoSkipTurnAction {
  return {
    type: TeamActionTypes.NO_SKIP_TURN,
    teamId
  };
}
