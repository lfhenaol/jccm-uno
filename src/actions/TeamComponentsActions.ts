import { TeamComponentsActionTypes } from '../action-types';
import { Component } from '../config/materials';

export interface AddComponentAction {
  type: typeof TeamComponentsActionTypes.ADD_COMPONENT;
  component: Component;
}

export interface DeliverComponentAction {
  type: typeof TeamComponentsActionTypes.DELIVER_COMPONENT;
  id: string;
}

export function addComponent(component: Component): AddComponentAction {
  return {
    type: TeamComponentsActionTypes.ADD_COMPONENT,
    component
  };
}

export function deliverComponent(id: string): DeliverComponentAction {
  return {
    type: TeamComponentsActionTypes.DELIVER_COMPONENT,
    id
  };
}
