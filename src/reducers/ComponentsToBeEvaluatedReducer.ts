import { Component } from '../config/materials';
import { DeleteComponentAction } from '../actions';
import { ComponentsToBeEvaluatedActionTypes } from '../action-types';

export function componentsToBeEvaluatedReducer(
  state: Component[] = [],
  action: DeleteComponentAction
) {
  switch (action.type) {
    case ComponentsToBeEvaluatedActionTypes.DELETE_COMPONENT:
      return state.filter(component => component.id !== action.id);
    default:
      return state;
  }
}
