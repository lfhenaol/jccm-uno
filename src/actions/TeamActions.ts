import { TeamActionTypes } from '../action-types/TeamActionTypes';
import { StatusTeam } from './TeamsActions';

export interface ChangeStatusAction {
  type: typeof TeamActionTypes.CHANGE_STATUS;
  status: StatusTeam;
}

export function changeStatus(status: StatusTeam): ChangeStatusAction {
  return {
    type: TeamActionTypes.CHANGE_STATUS,
    status
  };
}
