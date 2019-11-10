import { Team } from '../config/materials';
import { TeamsActionTypesI } from '../actions';
import { TeamsActionTypes } from '../action-types';
import { teamReducer } from './TeamReducer';

export function teamsReducer(
  state: Team[] = [],
  action: TeamsActionTypesI
): Team[] {
  switch (action.type) {
    case TeamsActionTypes.ADD_TO_TEAMS:
      const newTeam: Team = {
        name: action.teamName,
        ...teamReducer(void 0, null)
      };
      return [...state, newTeam];
    default:
      return state;
  }
}
