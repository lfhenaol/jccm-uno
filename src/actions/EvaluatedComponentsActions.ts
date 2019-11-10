import { EvaluatedComponentsActionTypes } from '../action-types';
import {Component} from "../config/materials";

export interface AddToBankAction {
  type: typeof EvaluatedComponentsActionTypes.ADD_TO_BANK,
  component: Component
}

export function addToBank(component: Component): AddToBankAction {
  return {
    type: EvaluatedComponentsActionTypes.ADD_TO_BANK,
    component
  };
}
