import materials, {
  Component,
  popSevenRandomComponents
} from '../config/materials';
import { TeamComponentsActionTypes } from '../action-types';
import { TeamActionTypesI } from '../actions';

export function teamComponentsReducer(
  state: Component[] | any,
  action: TeamActionTypesI | any
): Component[] {
  switch (action.type) {
    case TeamComponentsActionTypes.ADD_COMPONENT:
      return [...state, action.component];
    case TeamComponentsActionTypes.DELIVER_COMPONENT:
      return state.filter((component: Component) => component.id !== action.id);
    default:
      if (typeof state === 'undefined') {
        return popSevenRandomComponents(materials);
      }
      return state;
  }
}
