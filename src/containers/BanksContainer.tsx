import { Col, Row } from 'antd';
import React from 'react';
import { BankComponentsToBeEvaluated } from '../components/BankComponentsToBeEvaluated';
import { BankEvaluatedComponents } from '../components/BankEvaluatedComponents';
import { JCCMUNOAppStore } from '../reducers';
import { addComponent, deleteComponent, StatusTeam } from '../actions';
import { Dispatch } from 'redux';
import { Component, Team } from '../config/materials';
import { connect } from 'react-redux';
import { canDeliverComponent, canTakeComponent } from '../config/rules';
import { changeStatus } from '../actions/TeamActions';

function BanksContainer({
  currentTeamEstimating,
  EvaluatedComponents,
  onTakeComponent,
  lastEvaluatedComponent,
  lastComponentToBeEvaluated,
  nextTeam
}: {
  currentTeamEstimating?: Team;
  EvaluatedComponents?: Component[];
  onTakeComponent?: Function;
  lastEvaluatedComponent: Component;
  lastComponentToBeEvaluated: Component;
  nextTeam: Team;
}) {
  return (
    <Row>
      <Col sm={12} className="d-flex justify-content-center">
        <BankComponentsToBeEvaluated
          nextTeam={nextTeam}
          lastComponentToBeEvaluated={lastComponentToBeEvaluated}
          lastEvaluatedComponent={lastEvaluatedComponent}
          // @ts-ignore
          currentTeamEstimating={currentTeamEstimating}
          // @ts-ignore
          onTakeComponent={onTakeComponent}
          onCanTakeComponent={canTakeComponent(
            // @ts-ignore
            currentTeamEstimating,
            lastEvaluatedComponent
          )}
        />
      </Col>
      <Col sm={12} className="d-flex justify-content-center">
        <BankEvaluatedComponents evaluatedComponents={EvaluatedComponents} />
      </Col>
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
    nextTeam: state.Teams[indexNextTeam],
    lastComponentToBeEvaluated:
      state.BankComponentsToBeEvaluated[
        state.BankComponentsToBeEvaluated.length - 1
      ],
    lastEvaluatedComponent:
      state.BankEvaluatedComponents[state.BankEvaluatedComponents.length - 1],
    ComponentsToBeEvaluated: state.BankComponentsToBeEvaluated,
    EvaluatedComponents: state.BankEvaluatedComponents,
    currentTeamEstimating
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onTakeComponent: ({
      component,
      teamId,
      lastEvaluatedComponent,
      nextTeam
    }: {
      component: Component;
      teamId: string;
      lastEvaluatedComponent: Component;
      nextTeam: Team;
    }) => {
      dispatch(addComponent(component, teamId));
      dispatch(deleteComponent(component.id));
      if (!canDeliverComponent(lastEvaluatedComponent, component)()) {
        alert(
          `El componente tomado ${component.name} no se puede entregar, termina entrega para el Equipo ${Number(
            teamId
          ) + 1}`
        );
        dispatch(changeStatus(StatusTeam.ESTIMATING, nextTeam.id));
        dispatch(changeStatus(StatusTeam.WAITING, teamId));
      }
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BanksContainer);
