import { TeamActionTypes } from '../action-types/TeamActionTypes';
import { StatusTeam } from './TeamsActions';

export interface ChangeStatusAction {
  type: typeof TeamActionTypes.CHANGE_STATUS;
  status: StatusTeam;
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
