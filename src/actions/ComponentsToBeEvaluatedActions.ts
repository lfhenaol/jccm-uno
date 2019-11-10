import { ComponentsToBeEvaluatedActionTypes } from '../action-types';

export interface DeleteComponentAction {
  type: typeof ComponentsToBeEvaluatedActionTypes.DELETE_COMPONENT;
  id: string;
}

/**
 * Primero se toma el componente del banco de componentes
 * y luego se informa que el componente debe ser borrado mediante este action
 * @param id
 */
export function deleteComponent(id: string): DeleteComponentAction {
  return {
    type: ComponentsToBeEvaluatedActionTypes.DELETE_COMPONENT,
    id
  };
}
