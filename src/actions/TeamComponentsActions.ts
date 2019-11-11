import { TeamComponentsActionTypes } from '../action-types';
import { Component, Modules } from '../config/materials';

export interface AddComponentAction {
  type: typeof TeamComponentsActionTypes.ADD_COMPONENT;
  component: Component;
  teamId: string;
}

export interface DeliverComponentAction {
  type: typeof TeamComponentsActionTypes.DELIVER_COMPONENT;
  componentId: string;
  teamId: string;
}

export interface UpdateModuleIntegratorComponentAction {
  type: typeof TeamComponentsActionTypes.UPDATE_MODULE_IN_INTEGRATOR_COMPONENT;
  componentId: string;
  teamId: string;
  module: string;
}

export interface UpdateDescriptionIntegratorComponentAction {
  type: typeof TeamComponentsActionTypes.UPDATE_DESCRIPTION_IN_INTEGRATOR_COMPONENT;
  componentId: string;
  teamId: string;
  description: string;
}

export function addComponent(
  component: Component,
  teamId: string
): AddComponentAction {
  return {
    type: TeamComponentsActionTypes.ADD_COMPONENT,
    teamId,
    component
  };
}

export function deliverComponent(
  componentId: string,
  teamId: string
): DeliverComponentAction {
  return {
    type: TeamComponentsActionTypes.DELIVER_COMPONENT,
    componentId,
    teamId
  };
}

export function updateModuleIntegratorComponent(
  componentId: string,
  teamId: string,
  module: Modules
): UpdateModuleIntegratorComponentAction {
  return {
    type: TeamComponentsActionTypes.UPDATE_MODULE_IN_INTEGRATOR_COMPONENT,
    componentId,
    teamId,
    module
  };
}

export function updateDescriptionIntegratorComponent(
  componentId: string,
  teamId: string,
  description: string
): UpdateDescriptionIntegratorComponentAction {
  return {
    type: TeamComponentsActionTypes.UPDATE_DESCRIPTION_IN_INTEGRATOR_COMPONENT,
    componentId,
    teamId,
    description
  };
}
