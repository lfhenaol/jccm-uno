import { AddToBankAction } from '../actions';
import { EvaluatedComponentsActionTypes } from '../action-types';
import { Component } from '../config/materials';

export function evaluatedComponentsReducer(
  state: Component[] = [],
  action: AddToBankAction
) {
  switch (action.type) {
    case EvaluatedComponentsActionTypes.ADD_TO_BANK:
      return [...state, action.component];
    default:
      return state;
  }
}
