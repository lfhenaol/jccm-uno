import { Button, Col, Row } from 'antd';
import React from 'react';
import {
  Component,
  IntegratorComponents,
  Modules,
  Team
} from '../config/materials';
import { JCCMUNOAppStore } from '../reducers';
import {
  addGlobalWinnerTeam,
  addIterationWinnerTeam,
  addToBank,
  deliverComponent,
  GlobalWinnerTeam,
  IterationWinnerTeam,
  StatusTeam
} from '../actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ComponentItem } from '../components/ComponentItem';
import { changeStatus, noSkipTurn } from '../actions/TeamActions';
import { canDeliverComponent, triggerEventComponent } from '../config/rules';

function ComponentsContainer({
  currentTeamEstimating,
  onDeliverComponent,
  onSkipsDelivery,
  onTerminateIteration,
  lastEvaluatedComponent,
  nextTeam,
  componentsToBeEvaluated,
  teams,
  results
}: {
  currentTeamEstimating?: Team;
  onDeliverComponent: Function;
  onSkipsDelivery: Function;
  onTerminateIteration: Function;
  lastEvaluatedComponent: Component;
  nextTeam: Team;
  componentsToBeEvaluated: Component[];
  teams: Team[];
  results: Array<IterationWinnerTeam | GlobalWinnerTeam>;
}) {
  // FOR TESTING (currentTeamEstimating as Team).components = [];
  return (
    <Row gutter={16} className="h-100">
      {(currentTeamEstimating as Team).components.length === 0 ? (
        <Col
          style={{ marginBottom: 15 }}
          className="d-flex justify-content-center align-items-center h-100"
        >
          <Button
            onClick={() =>
              onTerminateIteration({ teams, currentTeamEstimating, results })
            }
            style={{ marginRight: 10 }}
            type={'primary'}
          >
            Terminar iteración
          </Button>
          <Button
            onClick={() =>
              onSkipsDelivery({
                teamId: (currentTeamEstimating as Team).id,
                nextTeam
              })
            }
            type={'danger'}
          >
            Pasar entrega
          </Button>
        </Col>
      ) : (
        (currentTeamEstimating as Team).components.map(component => (
          <ComponentItem
            // @ts-ignore
            currentTeam={currentTeamEstimating}
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
        ))
      )}
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
    currentTeamEstimating,
    results: state.Results
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onTerminateIteration({
      teams,
      currentTeamEstimating,
      results
    }: {
      teams: Team[];
      currentTeamEstimating: Team;
      results: Array<IterationWinnerTeam | GlobalWinnerTeam>;
    }) {
      let winnerScore = 0;
      teams
        .filter((team: Team) => team.id !== currentTeamEstimating.id)
        .forEach((team: Team) => {
          team.components.forEach(component => {
            winnerScore += component.score;
          });
        });

      if (results.length < 5) {
        const iteration = (results.length + 1).toString();
        dispatch(
          addIterationWinnerTeam({
            iteration,
            score: winnerScore,
            team: currentTeamEstimating.name
          })
        );
        alert(
          `El equipo que completó la iteración ${iteration} es el ${currentTeamEstimating.name}`
        );
      } else {
        // @ts-ignore
        let globalWinner: GlobalWinnerTeam = {};
        let minorScore = results[0].score;
        results.forEach(result => {
          if (result.score <= minorScore) {
            globalWinner = result;
            minorScore = result.score;
          }
        });
        dispatch(addIterationWinnerTeam({score: globalWinner.score, team: globalWinner.team, iteration: '\ud83e\udd73 \ud83c\udf89\n'}));
        alert(
          `El equipo que consigue asegurar por completo el proyecto es ${globalWinner.team}`
        );
      }
      dispatch({ type: 'RELOAD' });
    },
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
          const compsCurrentEstimatingTeam = teams.filter((team)=> team.id === teamId)
              .map((team)=> team.components)[0];
          dispatch(addToBank(newComponent || component));
          dispatch(deliverComponent(component.id, teamId));
          if (compsCurrentEstimatingTeam.length > 1) {
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
          }
        })
        .catch(() => null);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentsContainer);
