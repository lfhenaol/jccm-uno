import {Team} from '../config/materials';
import {ChangeStatusAction} from '../actions/TeamActions';
import {TeamActionTypes} from '../action-types/TeamActionTypes';
import {StatusTeam, TeamActionTypesI} from '../actions';
import {teamComponentsReducer} from './TeamComponentsReducer';

export function teamReducer(
  state: Team | any,
  action: TeamActionTypesI | any
): Team {
  switch (action.type) {
    case TeamActionTypes.CHANGE_STATUS:
      return Object.assign({}, state, {
        status: action.status
      });
    case TeamActionTypes.SKIP_TURN:
      return Object.assign({}, state, {
        skipTurn: true
      });
    case TeamActionTypes.NO_SKIP_TURN:
      return Object.assign({}, state, {
        skipTurn: false
      });
    default:
      if (typeof state === 'undefined') {
        return {
          id: '',
          skipTurn: false,
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
