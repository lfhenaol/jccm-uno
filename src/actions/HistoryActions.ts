import { HistoryActionTypes } from '../action-types';
import {Component, Team} from '../config/materials';

export interface HistoryEvent {
  team: Team;
  component?: Component;
}

export interface UpdateHistoryAction {
  type: typeof HistoryActionTypes.UPDATE_HISTORY;
  event: HistoryEvent
}

export function updateHistory(event: HistoryEvent): UpdateHistoryAction {
  return {
    type: HistoryActionTypes.UPDATE_HISTORY,
    event
  };
}
