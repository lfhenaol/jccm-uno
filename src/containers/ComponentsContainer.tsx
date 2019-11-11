import { Row } from 'antd';
import React from 'react';
import {
  Component,
  CompoundComponents,
  IntegratorComponents,
  Modules,
  Team
} from '../config/materials';
import { JCCMUNOAppStore } from '../reducers';
import { addToBank, deliverComponent, StatusTeam } from '../actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ComponentItem } from '../components/ComponentItem';

function ComponentsContainer({
  currentTeamEstiming,
  onDeliverComponent,
  lastEvaluatedComponent
}: {
  currentTeamEstiming?: Team;
  onDeliverComponent: Function;
  lastEvaluatedComponent: Component;
}) {
  const canDeliverComponent = (component: Component): (() => boolean) => {
    return () => {
      if (!lastEvaluatedComponent || component.integrator) {
        return true;
      }

      if (lastEvaluatedComponent.integrator) {
        switch (lastEvaluatedComponent.type.code) {
          case IntegratorComponents.chooseModule:
            return lastEvaluatedComponent.mod === component.mod;
          case IntegratorComponents.plusFour:
            return true;
        }
      } else if (lastEvaluatedComponent.compound) {
        switch (lastEvaluatedComponent.type.code) {
          case CompoundComponents.reverse:
          case CompoundComponents.stop:
          case CompoundComponents.plusTwo:
            return lastEvaluatedComponent.mod === component.mod;
        }
      } else {
        return (
          lastEvaluatedComponent.mod === component.mod ||
          lastEvaluatedComponent.score === component.score
        );
      }

      return false;
    };
  };
  return (
    <Row gutter={16}>
      {(currentTeamEstiming as Team).components.map(component => (
        <ComponentItem
          key={component.id}
          teamId={(currentTeamEstiming as Team).id}
          component={component}
          onCanDeliverComponent={canDeliverComponent(component)}
          onDeliverComponent={onDeliverComponent}
        />
      ))}
    </Row>
  );
}

function mapStateToProps(state: JCCMUNOAppStore) {
  console.log(state);
  return {
    lastEvaluatedComponent:
      state.BankEvaluatedComponents[state.BankEvaluatedComponents.length - 1],
    currentTeamEstiming: state.Teams.filter(
      team => team.status === StatusTeam.ESTIMING
    )[0]
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onDeliverComponent: (
      component: Component,
      teamId: string,
      handleModalChooseModule: () => Promise<any>
    ) => {
      debugger;
      const promise: Promise<Component> = new Promise((resolve, reject) => {
        if (
          component.integrator &&
          component.type.code === IntegratorComponents.chooseModule
        ) {
          handleModalChooseModule()
            .then((module: Modules) => {
              //dispatch(updateModuleIntegratorComponent(component.id, teamId, module));
              resolve(Object.assign({}, component, { mod: module }));
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
        })
        .catch(() => null);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentsContainer);
