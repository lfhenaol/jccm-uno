import {
  GlobalWinnerTeam,
  IterationWinnerTeam,
  ResultsActionTypesI
} from '../actions';
import { ResultsActionTypes } from '../action-types';

export function resultReducer(
  state: Array<IterationWinnerTeam | GlobalWinnerTeam> = [],
  action: ResultsActionTypesI
): Array<IterationWinnerTeam | GlobalWinnerTeam> {
  switch (action.type) {
    case ResultsActionTypes.ADD_ITERATION_WINNER_TEAM:
      return [...state, action.winner];
    case ResultsActionTypes.ADD_GLOBAL_WINNER_TEAM:
      return [...state, action.globalWinner];
    default:
      return state;
  }
}
