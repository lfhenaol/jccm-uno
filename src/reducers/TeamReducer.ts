import { Team } from '../config/materials';
import { ChangeStatusAction } from '../actions/TeamActions';
import { TeamActionTypes } from '../action-types/TeamActionTypes';
import { StatusTeam } from '../actions';
import { teamComponentsReducer } from './TeamComponentsReducer';

export function teamReducer(
  state: Team | any,
  action: ChangeStatusAction | any
): Team {
  switch (action.type) {
    case TeamActionTypes.CHANGE_STATUS:
      return Object.assign({}, state, {
        status: action.status
      });
    default:
      if (typeof state === 'undefined') {
        return {
          id: '',
          name: '',
          status: StatusTeam.WAITING,
          components: teamComponentsReducer(void 0, null)
        };
      }
      return Object.assign({}, state, {
        components: teamComponentsReducer(state.components, action)
      });
  }
}
