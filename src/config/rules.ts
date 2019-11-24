import {
  Component,
  CompoundComponents,
  IntegratorComponents,
  Team
} from './materials';
import { addComponent, deleteComponent, StatusTeam } from '../actions';
import { Dispatch } from 'redux';
import { skipTurn } from '../actions/TeamActions';

export const canDeliverComponent = (
  lastEvaluatedComponent: Component,
  currentComponent: Component,
  currentTeamEstimating?: Team
): (() => boolean) => {
  return () => {
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
          // @ts-ignore
          if (!currentTeamEstimating) {
            console.warn('TODO, llamada recursiva que no tiene en cuenta la variable currentTeamEstimating');
            return true;
          }
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
  teamId,
  teams
}: {
  lastEvaluatedComponent: Component;
  componentsToBeEvaluated: Component[];
  dispatch: Dispatch;
  teamId: string;
  teams: Team[];
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
      'Dado que el último componente evaluado es TOMAR CUATRO componentes nuevos, le han sido asignados CUATRO componentes.'
    );
  } else if (lastEvaluatedComponent.compound) {
    switch (lastEvaluatedComponent.type.code) {
      case CompoundComponents.plusTwo:
        for (
          let i = componentsToBeEvaluated.length - 1;
          i >= componentsToBeEvaluated.length - 2;
          i--
        ) {
          dispatch(addComponent(componentsToBeEvaluated[i], teamId));
          dispatch(deleteComponent(componentsToBeEvaluated[i].id));
        }
        alert(
          'Dado que el último componente evaluado fue TOMAR DOS componentes nuevos, le han sido asignados DOS componentes.'
        );
        break;
      case CompoundComponents.stop:
        const currentTeamEstimating = teams.filter(
          team => team.status === StatusTeam.ESTIMATING
        )[0];
        let indexNextTeam = teams.indexOf(currentTeamEstimating) + 1;
        indexNextTeam = indexNextTeam < teams.length ? indexNextTeam : 0;
        const idNextTeam = teams[indexNextTeam].id;
        dispatch(skipTurn(idNextTeam));
        break;
      case CompoundComponents.reverse:
        break;
    }
  }
};
