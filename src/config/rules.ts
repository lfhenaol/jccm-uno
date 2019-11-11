import {
  Component,
  CompoundComponents,
  IntegratorComponents,
  Team
} from './materials';
import { addComponent, deleteComponent } from '../actions';
import { Dispatch } from 'redux';

export const canDeliverComponent = (
  lastEvaluatedComponent: Component,
  currentComponent: Component,
  currentTeamEstimating?: Team
): (() => boolean) => {
  return () => {
    debugger;

    if (!lastEvaluatedComponent) {
      return (
        !currentComponent.integrator ||
        (currentComponent.integrator &&
          currentComponent.type.code !== IntegratorComponents.plusFour)
      );
    }

    if (currentComponent.integrator) {
      switch (currentComponent.type.code) {
        case IntegratorComponents.chooseModule:
          return true;
        case IntegratorComponents.plusFour:
          debugger;
          // @ts-ignore
          return currentTeamEstimating.components.every(
            (component: Component) => {
              if (
                component.integrator &&
                component.type.code === IntegratorComponents.plusFour
              ) {
                return true;
              }
              return !canDeliverComponent(lastEvaluatedComponent, component)();
            }
          );
      }
    }

    if (lastEvaluatedComponent.integrator) {
      switch (lastEvaluatedComponent.type.code) {
        case IntegratorComponents.chooseModule:
          return lastEvaluatedComponent.mod === currentComponent.mod;
        case IntegratorComponents.plusFour:
          return true;
      }
    } else if (lastEvaluatedComponent.compound) {
      switch (lastEvaluatedComponent.type.code) {
        case CompoundComponents.reverse:
        case CompoundComponents.stop:
        case CompoundComponents.plusTwo:
          return lastEvaluatedComponent.mod === currentComponent.mod;
      }
    } else {
      return (
        lastEvaluatedComponent.mod === currentComponent.mod ||
        lastEvaluatedComponent.score === currentComponent.score
      );
    }

    return false;
  };
};

export const canTakeComponent = (
  currentTeamEstimating: Team,
  lastEvaluatedComponent: Component
) => {
  return () =>
    currentTeamEstimating.components.every(
      component =>
        !canDeliverComponent(
          lastEvaluatedComponent,
          component,
          currentTeamEstimating
        )()
    );
};

export const triggerEventComponent = ({
  lastEvaluatedComponent,
  componentsToBeEvaluated,
  dispatch,
  teamId
}: {
  lastEvaluatedComponent: Component;
  componentsToBeEvaluated: Component[];
  dispatch: Dispatch;
  teamId: string;
}) => {
  if (
    lastEvaluatedComponent.integrator &&
    lastEvaluatedComponent.type.code === IntegratorComponents.plusFour
  ) {
    for (
      let i = componentsToBeEvaluated.length - 1;
      i >= componentsToBeEvaluated.length - 4;
      i--
    ) {
      dispatch(addComponent(componentsToBeEvaluated[i], teamId));
      dispatch(deleteComponent(componentsToBeEvaluated[i].id));
    }
    alert(
      'Dado que el último componente evaluado es tomar cuatro componentes nuevos, le han sido asignados cuatro componentes.'
    );
  }
};
