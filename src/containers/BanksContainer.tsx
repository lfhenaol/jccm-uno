import { Col, Row } from 'antd';
import React from 'react';
import { BankComponentsToBeEvaluated } from '../components/BankComponentsToBeEvaluated';
import { BankEvaluatedComponents } from '../components/BankEvaluatedComponents';
import { JCCMUNOAppStore } from '../reducers';
import { addComponent, deleteComponent, StatusTeam } from '../actions';
import { Dispatch } from 'redux';
import { Component } from '../config/materials';
import { connect } from 'react-redux';

function BanksContainer({
  ComponentsToBeEvaluated,
  teamId,
  EvaluatedComponents,
  onTakeComponent
}: {
  ComponentsToBeEvaluated?: Component[];
  teamId?: string;
  EvaluatedComponents?: Component[];
  onTakeComponent?: Function;
}) {
  return (
    <Row>
      <Col sm={12} className="d-flex justify-content-center">
        <BankComponentsToBeEvaluated
          teamId={teamId}
          componentsToBeEvaluated={ComponentsToBeEvaluated}
          onTakeComponent={onTakeComponent}
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
  return {
    ComponentsToBeEvaluated: state.BankComponentsToBeEvaluated,
    EvaluatedComponents: state.BankEvaluatedComponents,
    teamId: state.Teams.filter(team => team.status === StatusTeam.ESTIMING)[0]
      .id
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onTakeComponent: (component: Component, teamId: string) => {
      dispatch(addComponent(component, teamId));
      dispatch(deleteComponent(component.id));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BanksContainer);
