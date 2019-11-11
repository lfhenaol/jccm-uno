import { Component } from '../config/materials';
import { TeamComponentsActionTypes } from '../action-types';
import { TeamComponentActionTypesI } from '../actions';

export function teamComponentsReducer(
  state: Component[] = [],
  action: TeamComponentActionTypesI | any
): Component[] {
  let updatedComponent: {} & Component & { mod: any };
  let newState: Component[];
  let componentToUpdate: Component;
  switch (action.type) {
    case TeamComponentsActionTypes.ADD_COMPONENT:
      return [action.component, ...state];
    case TeamComponentsActionTypes.DELIVER_COMPONENT:
      return state.filter(
        (component: Component) => component.id !== action.componentId
      );
    case TeamComponentsActionTypes.UPDATE_MODULE_IN_INTEGRATOR_COMPONENT:
      componentToUpdate = state.filter(
        (component: Component) => component.id === action.componentId
      )[0];
      newState = state.filter(
        (component: Component) => component.id !== action.componentId
      );
      updatedComponent = Object.assign({}, componentToUpdate, {
        mod: action.module
      });
      return [...newState, updatedComponent];
    case TeamComponentsActionTypes.UPDATE_DESCRIPTION_IN_INTEGRATOR_COMPONENT:
      componentToUpdate = state.filter(
        (component: Component) => component.id === action.componentId
      )[0];
      newState = state.filter(
        (component: Component) => component.id !== action.componentId
      );
      updatedComponent = Object.assign({}, componentToUpdate, {
        description: action.description
      });
      return [...newState, updatedComponent];
    default:
      return state;
  }
}
