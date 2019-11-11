import { Component } from '../config/materials';
import { TeamComponentsActionTypes } from '../action-types';
import { TeamActionTypesI } from '../actions';

export function teamComponentsReducer(
  state: Component[] = [],
  action: TeamActionTypesI | any
): Component[] {
  switch (action.type) {
    case TeamComponentsActionTypes.ADD_COMPONENT:
      return [action.component, ...state];
    case TeamComponentsActionTypes.DELIVER_COMPONENT:
      return state.filter(
        (component: Component) => component.id !== action.componentId
      );
    case TeamComponentsActionTypes.UPDATE_MODULE_IN_INTEGRATOR_COMPONENT:
      const componentToUpdate: Component = state.filter(
        (component: Component) => component.id === action.componentId
      )[0];
      const newState = state.filter(
        (component: Component) => component.id !== action.componentId
      );
      const updatedComponent = Object.assign({}, componentToUpdate, {
        mod: action.module
      });
      return [...newState, updatedComponent];
    default:
      return state;
  }
}
