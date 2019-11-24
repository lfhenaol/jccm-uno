import { Row } from 'antd';
import React from 'react';
import {
  Component,
  IntegratorComponents,
  Modules,
  Team
} from '../config/materials';
import { JCCMUNOAppStore } from '../reducers';
import { addToBank, deliverComponent, StatusTeam } from '../actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ComponentItem } from '../components/ComponentItem';
import { changeStatus, noSkipTurn } from '../actions/TeamActions';
import { canDeliverComponent, triggerEventComponent } from '../config/rules';

function ComponentsContainer({
  currentTeamEstimating,
  onDeliverComponent,
  onSkipsDelivery,
  lastEvaluatedComponent,
  nextTeam,
  componentsToBeEvaluated,
  teams
}: {
  currentTeamEstimating?: Team;
  onDeliverComponent: Function;
  onSkipsDelivery: Function;
  lastEvaluatedComponent: Component;
  nextTeam: Team;
  componentsToBeEvaluated: Component[];
  teams: Team[];
}) {
  return (
    <Row gutter={16}>
      {(currentTeamEstimating as Team).components.map(component => (
        <ComponentItem
          // @ts-ignore
          currentTeam={currentTeamEstimating}
          key={component.id}
          onSkipsDelivery={onSkipsDelivery}
          teamId={(currentTeamEstimating as Team).id}
          component={component}
          nextTeam={nextTeam}
          onCanDeliverComponent={canDeliverComponent(
            lastEvaluatedComponent,
            component,
            currentTeamEstimating
          )}
          teams={teams}
          componentsToBeEvaluated={componentsToBeEvaluated}
          onDeliverComponent={onDeliverComponent}
        />
      ))}
    </Row>
  );
}

function mapStateToProps(state: JCCMUNOAppStore) {
  console.log(state);
  const currentTeamEstimating = state.Teams.filter(
    team => team.status === StatusTeam.ESTIMATING
  )[0];
  let indexNextTeam = state.Teams.indexOf(currentTeamEstimating) + 1;
  indexNextTeam = indexNextTeam < state.Teams.length ? indexNextTeam : 0;
  return {
    teams: state.Teams,
    componentsToBeEvaluated: state.BankComponentsToBeEvaluated,
    nextTeam: state.Teams[indexNextTeam],
    lastEvaluatedComponent:
      state.BankEvaluatedComponents[state.BankEvaluatedComponents.length - 1],
    currentTeamEstimating
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onSkipsDelivery: ({
      teamId,
      nextTeam
    }: {
      component: Component;
      teamId: string;
      nextTeam: Team;
      componentsToBeEvaluated: Component[];
      teams: Team[];
    }) => {
      alert(`Termina entrega para el Equipo ${Number(teamId) + 1}`);
      dispatch(changeStatus(StatusTeam.ESTIMATING, nextTeam.id));
      dispatch(noSkipTurn(teamId));
      dispatch(changeStatus(StatusTeam.WAITING, teamId));
    },
    onDeliverComponent: ({
      component,
      teamId,
      handleModalChooseModule,
      nextTeam,
      componentsToBeEvaluated,
      teams
    }: {
      component: Component;
      teamId: string;
      handleModalChooseModule: () => Promise<any>;
      nextTeam: Team;
      componentsToBeEvaluated: Component[];
      teams: Team[];
    }) => {
      const promise: Promise<Component> = new Promise((resolve, reject) => {
        if (
          component.integrator &&
          component.type.code === IntegratorComponents.chooseModule
        ) {
          handleModalChooseModule()
            .then((module: Modules) => {
              //dispatch(updateModuleIntegratorComponent(component.id, teamId, module));
              resolve(
                Object.assign({}, component, {
                  mod: module,
                  description: `Componente integrador <strong>para el módulo ${module}</strong>.`
                })
              );
            })
            .catch(() => {
              reject();
            });
        } else {
          resolve();
        }
      });

      promise
        .then((newComponent: Component) => {
          dispatch(addToBank(newComponent || component));
          dispatch(deliverComponent(component.id, teamId));
          alert(`Termina entrega para el Equipo ${Number(teamId) + 1}`);
          dispatch(changeStatus(StatusTeam.ESTIMATING, nextTeam.id));
          dispatch(changeStatus(StatusTeam.WAITING, teamId));
          triggerEventComponent({
            teamId: nextTeam.id,
            dispatch,
            lastEvaluatedComponent: newComponent || component,
            componentsToBeEvaluated,
            teams
          });
        })
        .catch(() => null);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentsContainer);
