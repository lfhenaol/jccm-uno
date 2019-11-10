import { HistoryEvent, UpdateHistoryAction } from '../actions';
import { HistoryActionTypes } from '../action-types';

export function historyReducer(
  state: HistoryEvent[] = [],
  action: UpdateHistoryAction
) {
  switch (action.type) {
    case HistoryActionTypes.UPDATE_HISTORY:
      return [...state, action.event];
    default:
      return state;
  }
}
